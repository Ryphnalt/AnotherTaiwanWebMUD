const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const fs = require('fs');
const Convert = require('ansi-to-html');

// --- 引入外部資料模組 ---
const itemDefinitions = require('./data/items');
const npcDefinitions = require('./data/npcs');
const skills = require('./data/skills');
const rooms = require('./data/rooms');
const guilds = require('./data/guilds');
const races = require('./data/races');

// 設定
const convert = new Convert({ fg: '#c0c0c0', bg: '#000000', newline: true });
const SAVE_DIR = './players'; // 存檔路徑改成 players

// 確保存檔資料夾存在
if (!fs.existsSync(SAVE_DIR)) {
    fs.mkdirSync(SAVE_DIR);
}

app.use(express.static(path.join(__dirname, 'public')));

// --- 全域變數 ---
let players = {};
let activeNpcs = [];

// --- 初始化世界 ---
function spawnNpcs() {
    activeNpcs = [];
    // 重置房間物品與生成 NPC
    for (let r in rooms) {
        rooms[r].objects = [];
        if (rooms[r].npcs) {
            rooms[r].npcs.forEach(npcId => {
                // 深拷貝 NPC 資料，確保獨立性
                let template = npcDefinitions[npcId];
                if (template) {
                    let npc = {
                        ...template,
                        roomId: r,
                        uuid: Math.random().toString(36).substr(2, 9)
                    };
                    activeNpcs.push(npc);
                }
            });
        }
    }
    console.log(`世界已重置，生成了 ${activeNpcs.length} 名 NPC。`);
}
spawnNpcs();

// --- 屬性計算系統 ---
function calculatePlayerAttributes(player) {
    const race = races[player.race] || races['human'];
    const guild = guilds[player.guild] || null;

    // 基礎屬性
    let baseHp = 200 + (player.level - 1) * 20;
    let baseForce = 100 + (player.level - 1) * 10;

    // 種族上限
    const raceHpCap = race.attributeCaps.hp;
    const raceForceCap = race.attributeCaps.force || 300;

    // 公會加成
    let hpBonus = 0;
    let forceBonus = 0;
    let hpCapBonus = 0;
    let forceCapBonus = 0;

    if (guild) {
        hpBonus = guild.attributeBonus.hp || 0;
        forceBonus = guild.attributeBonus.force || 0;
        hpCapBonus = guild.attributeCapBonus.hp || 0;
        forceCapBonus = guild.attributeCapBonus.force || 0;
    }

    // 計算最大值
    const maxHp = Math.min(baseHp + hpBonus, raceHpCap + hpCapBonus);
    const maxForce = Math.min(baseForce + forceBonus, raceForceCap + forceCapBonus);

    // 確保當前值不超過最大值
    if (player.max_hp !== maxHp) {
        player.max_hp = maxHp;
        if (player.hp > maxHp) player.hp = maxHp;
    }
    if (player.max_force !== maxForce) {
        player.max_force = maxForce;
        if (player.force > maxForce) player.force = maxForce;
    }
}

// --- 玩家資料存取 ---
function savePlayer(player) {
    const dataToSave = {
        name: player.name,
        room: player.room,
        race: player.race,
        guild: player.guild,
        hp: player.hp,
        max_hp: player.max_hp,
        force: player.force,
        max_force: player.max_force,
        xp: player.xp,
        level: player.level,
        inventory: player.inventory,
        equipment: player.equipment
    };
    fs.writeFileSync(`${SAVE_DIR}/${player.name}.json`, JSON.stringify(dataToSave, null, 2));
}

function loadPlayer(name) {
    try {
        if (fs.existsSync(`${SAVE_DIR}/${name}.json`)) {
            return JSON.parse(fs.readFileSync(`${SAVE_DIR}/${name}.json`));
        }
    } catch (e) { console.error("讀檔失敗", e); }
    return null;
}

// --- 連線與指令處理 ---
io.on('connection', (socket) => {
    let player = { id: socket.id, state: 'LOGIN' };
    players[socket.id] = player;

    socket.emit('message', { type: 'system', text: convert.toHtml('\x1b[1;36m*** 平行時空的台灣 WebMUD (模組化版) ***\x1b[0m') });
    socket.emit('message', { type: 'system', text: '請輸入您的名字:' });

    socket.on('command', (msg) => {
        if (!msg) return;
        msg = msg.trim();

        // 登入階段
        if (player.state === 'LOGIN') {
            const name = msg;
            const savedData = loadPlayer(name);

            if (savedData) {
                Object.assign(player, savedData);
                player.id = socket.id;
                player.combat_target = null;

                // 如果舊玩家沒有種族，設定為預設值
                if (!player.race) {
                    player.race = 'human';
                }
                // 如果沒有公會，設為null
                if (!player.guild) {
                    player.guild = null;
                }

                calculatePlayerAttributes(player);
                socket.emit('message', { type: 'system', text: convert.toHtml(`\x1b[1;32m歡迎回來，${player.name}！\x1b[0m`) });
                player.state = 'PLAYING';
                lookRoom(player);
            } else {
                player.name = name;
                player.room = 'grand_hotel';
                player.hp = 200; player.max_hp = 200;
                player.force = 100; player.max_force = 100;
                player.xp = 0; player.level = 1;
                player.inventory = [];
                player.equipment = { weapon: null, armor: null };
                player.state = 'SELECT_RACE';
                showRaceSelection(socket);
            }
            return;
        }

        // 選擇種族階段
        if (player.state === 'SELECT_RACE') {
            const raceKey = msg.toLowerCase();
            if (races[raceKey]) {
                player.race = raceKey;
                player.guild = null; // 初始沒有公會
                calculatePlayerAttributes(player);
                player.hp = player.max_hp;
                player.force = player.max_force;
                socket.emit('message', { type: 'system', text: convert.toHtml(`\x1b[1;32m歡迎新玩家 ${player.name}！\x1b[0m`) });
                socket.emit('message', { type: 'system', text: convert.toHtml(`\x1b[1;36m你選擇了 ${races[player.race].name} 種族。\x1b[0m`) });
                socket.emit('message', { type: 'info', text: convert.toHtml(`\x1b[1;33m提示：你可以在地圖上找到各個公會，輸入 "guilds" 查看所有公會位置。\x1b[0m`) });
                player.state = 'PLAYING';
                lookRoom(player);
            } else {
                socket.emit('message', { type: 'error', text: '無效的種族，請重新選擇。' });
                showRaceSelection(socket);
            }
            return;
        }

        // 遊戲階段
        const parts = msg.split(' ');
        const cmd = parts[0].toLowerCase();
        const arg = parts.slice(1).join(' ');

        const commands = {
            'look': () => lookRoom(player), 'l': () => lookRoom(player),
            'hp': () => showStatus(player), 'score': () => showStatus(player),
            'inventory': () => showInventory(player), 'i': () => showInventory(player),
            'get': () => getItem(player, arg), 'g': () => getItem(player, arg),
            'kill': () => handleCombat(player, arg), 'k': () => handleCombat(player, arg),
            'wield': () => equipItem(player, arg, 'weapon'),
            'wear': () => equipItem(player, arg, 'armor'),
            'remove': () => removeItem(player, arg),
            'perform': () => performSkill(player, arg), 'p': () => performSkill(player, arg),
            'save': () => { savePlayer(player); socket.emit('message', { type: 'system', text: '存檔成功。' }); },
            'say': () => io.emit('message', { type: 'chat', text: `${player.name}: ${arg}` }),
            'guild': () => showGuildInfo(socket, player), 'guildinfo': () => showGuildInfo(socket, player),
            'guilds': () => showAllGuilds(socket),
            'join': () => joinGuild(player, arg),
            'leave': () => leaveGuild(player),
            'skills': () => showSkills(player), 'skill': () => showSkills(player),
            'help': () => {
                let help = '\n\x1b[1;36m【 指令列表 】\x1b[0m\n';
                help += '基本: look(l), hp(score), inventory(i), save\n';
                help += '移動: north(n), south(s), east(e), west(w), 以及複合方向(nw/ne/sw/se/wn/en/ws/es)\n';
                help += '戰鬥: kill(k) <目標>, perform(p) <技能>\n';
                help += '物品: get(g) <物品>, wield <武器>, wear <防具>, remove <裝備>\n';
                help += '公會: guilds, join <公會>, leave, guild(guildinfo)\n';
                help += '其他: say <話>, skills(skill), help\n';
                socket.emit('message', { type: 'info', text: convert.toHtml(help) });
            }
        };

        // 移動指令
        const directions = ['n', 's', 'e', 'w', 'north', 'south', 'east', 'west',
            'nw', 'ne', 'sw', 'se', 'northwest', 'northeast', 'southwest', 'southeast',
            'wn', 'en', 'ws', 'es', 'westnorth', 'eastnorth', 'westsouth', 'eastsouth'];
        if (directions.includes(cmd)) {
            let dir = cmd;
            // 標準化方向名稱
            const dirMap = {
                'n': 'north', 's': 'south', 'e': 'east', 'w': 'west',
                'nw': 'northwest', 'ne': 'northeast', 'sw': 'southwest', 'se': 'southeast',
                'wn': 'westnorth', 'en': 'eastnorth', 'ws': 'westsouth', 'es': 'eastsouth'
            };
            if (dirMap[cmd]) dir = dirMap[cmd];

            if (player.combat_target) socket.emit('message', { type: 'error', text: '戰鬥中無法移動！' });
            else move(player, dir);
            return;
        }

        if (commands[cmd]) commands[cmd]();
        else socket.emit('message', { type: 'error', text: '未知指令。' });
    });

    socket.on('disconnect', () => {
        if (player.state === 'PLAYING') savePlayer(player);
        delete players[socket.id];
    });
});

// --- 邏輯函式庫 ---

function showRaceSelection(socket) {
    let output = '\n\x1b[1;36m請選擇您的種族：\x1b[0m\n';
    for (let key in races) {
        const race = races[key];
        output += `\x1b[1;33m${key}\x1b[0m - ${race.name}: ${race.desc}\n`;
    }
    output += '\n請輸入種族代碼（如: human）:';
    socket.emit('message', { type: 'system', text: convert.toHtml(output) });
}

function showGuildInfo(socket, player) {
    if (!player.guild) {
        socket.emit('message', { type: 'info', text: convert.toHtml('\x1b[1;33m你目前沒有加入任何公會。輸入 "guilds" 查看所有公會位置。\x1b[0m') });
        return;
    }

    const guild = guilds[player.guild];
    if (!guild) return;

    let output = `\n\x1b[1;33m=== ${guild.name} 公會 ===\x1b[0m\n`;
    output += `${guild.desc}\n\n`;
    output += `\x1b[1;36m專屬特性：\x1b[0m\n`;
    guild.features.forEach(f => output += `  • ${f}\n`);

    socket.emit('message', { type: 'info', text: convert.toHtml(output) });
}

function showAllGuilds(socket) {
    let output = '\n\x1b[1;36m【 所有公會列表 】\x1b[0m\n';
    for (let key in guilds) {
        const guild = guilds[key];
        const req = guild.joinRequirements;
        let reqText = `等級 ${req.level}`;
        if (req.xp > 0) reqText += `, 經驗 ${req.xp}`;
        if (req.item) reqText += `, 需要物品: ${req.item}`;

        output += `\n\x1b[1;33m${guild.name}\x1b[0m\n`;
        output += `  位置: ${guild.locationName}\n`;
        output += `  加入條件: ${reqText}\n`;
        output += `  描述: ${guild.desc.substring(0, 60)}...\n`;
    }
    output += '\n\x1b[1;36m提示：前往對應的公會位置，輸入 "join <公會代碼>" 加入。\x1b[0m\n';
    socket.emit('message', { type: 'info', text: convert.toHtml(output) });
}

function joinGuild(player, guildKey) {
    if (!guildKey) {
        io.to(player.id).emit('message', { type: 'error', text: '請指定要加入的公會。輸入 "guilds" 查看所有公會。' });
        return;
    }

    guildKey = guildKey.toLowerCase();
    const guild = guilds[guildKey];

    if (!guild) {
        io.to(player.id).emit('message', { type: 'error', text: '找不到該公會。輸入 "guilds" 查看所有公會。' });
        return;
    }

    // 檢查是否已經在公會中
    if (player.guild) {
        io.to(player.id).emit('message', { type: 'error', text: `你已經是 ${guilds[player.guild].name} 的成員。請先使用 "leave" 退出當前公會。` });
        return;
    }

    // 檢查是否在正確的位置
    const room = rooms[player.room];
    if (!room.guild || room.guild !== guildKey) {
        io.to(player.id).emit('message', { type: 'error', text: `你必須在 ${guild.locationName} 才能加入。` });
        return;
    }

    // 檢查加入條件
    const req = guild.joinRequirements;
    if (player.level < req.level) {
        io.to(player.id).emit('message', { type: 'error', text: `加入條件：需要等級 ${req.level}，你目前等級 ${player.level}。` });
        return;
    }

    if (player.xp < req.xp) {
        io.to(player.id).emit('message', { type: 'error', text: `加入條件：需要經驗 ${req.xp}，你目前經驗 ${player.xp}。` });
        return;
    }

    if (req.item) {
        const hasItem = player.inventory.some(item => item.id === req.item);
        if (!hasItem) {
            io.to(player.id).emit('message', { type: 'error', text: `加入條件：需要物品 ${req.item}。` });
            return;
        }
    }

    // 加入公會
    player.guild = guildKey;
    calculatePlayerAttributes(player);
    io.to(player.id).emit('message', { type: 'system', text: convert.toHtml(`\x1b[1;32m恭喜！你成功加入了 ${guild.name}！\x1b[0m`) });
    showGuildInfo({ emit: (type, msg) => io.to(player.id).emit(type, msg) }, player);
    savePlayer(player);
}

function leaveGuild(player) {
    if (!player.guild) {
        io.to(player.id).emit('message', { type: 'error', text: '你目前沒有加入任何公會。' });
        return;
    }

    const guildName = guilds[player.guild].name;
    player.guild = null;
    calculatePlayerAttributes(player);
    io.to(player.id).emit('message', { type: 'system', text: convert.toHtml(`\x1b[1;33m你已退出 ${guildName}。\x1b[0m`) });
    savePlayer(player);
}

function showSkills(player) {
    const guild = guilds[player.guild];
    let output = '\n\x1b[1;37m【 技能列表 】\x1b[0m\n';

    // 通用技能
    output += '\x1b[1;36m通用技能：\x1b[0m\n';
    for (let key in skills) {
        const skill = skills[key];
        if (!skill.guild) {
            output += `  \x1b[33m${key}\x1b[0m - ${skill.name}: ${skill.desc} (消耗: ${skill.cost})\n`;
        }
    }

    // 公會專屬技能
    if (guild) {
        output += `\n\x1b[1;36m${guild.name} 專屬技能：\x1b[0m\n`;
        for (let key in skills) {
            const skill = skills[key];
            if (skill.guild === player.guild) {
                output += `  \x1b[33m${key}\x1b[0m - ${skill.name}: ${skill.desc} (消耗: ${skill.cost})\n`;
            }
        }
    }

    output += '\n使用指令: perform <技能代碼> 或 p <技能代碼>\n';
    io.to(player.id).emit('message', { type: 'info', text: convert.toHtml(output) });
}

function lookRoom(player) {
    const room = rooms[player.room];
    let output = `\n\x1b[1;33m== ${room.name} ==\x1b[0m\n${room.desc}\n`;

    // 如果是公會房間，顯示公會信息
    if (room.guild) {
        const guild = guilds[room.guild];
        if (guild) {
            output += `\n\x1b[1;36m【 公會信息 】\x1b[0m\n`;
            const req = guild.joinRequirements;
            let reqText = `等級 ${req.level}`;
            if (req.xp > 0) reqText += `, 經驗 ${req.xp}`;
            if (req.item) reqText += `, 需要物品: ${req.item}`;
            output += `加入條件: ${reqText}\n`;
            if (player.guild === room.guild) {
                output += `\x1b[1;32m你已經是 ${guild.name} 的成員。\x1b[0m\n`;
            } else if (player.guild) {
                output += `\x1b[1;33m提示：你目前是 ${guilds[player.guild].name} 的成員，需要先退出才能加入其他公會。\x1b[0m\n`;
            }
        }
    }

    output += `\x1b[1;36m明顯出口: [ ${Object.keys(room.exits).filter(k => k.length > 1).join(', ')} ]\x1b[0m\n`;

    room.objects.forEach(obj => output += `\x1b[35m  ${obj.displayName || obj.name}\x1b[0m\n`);
    activeNpcs.filter(n => n.roomId === player.room).forEach(npc => output += `\x1b[1;31m(NPC) ${npc.name} ${npc.desc}\x1b[0m\n`);

    for (let id in players) {
        if (players[id].room === player.room && id !== player.id) output += `\x1b[1;37m${players[id].name} 在這裡。\x1b[0m\n`;
    }
    io.to(player.id).emit('message', { type: 'room', text: convert.toHtml(output) });
}

function move(player, dir) {
    const room = rooms[player.room];
    if (room.exits[dir]) {
        player.room = room.exits[dir];
        lookRoom(player);
    } else {
        io.to(player.id).emit('message', { type: 'error', text: '那邊沒有路。' });
    }
}

function getItem(player, targetName) {
    if (!targetName) return;
    const room = rooms[player.room];
    const index = room.objects.findIndex(obj => obj.name.includes(targetName) || obj.id === targetName);

    if (index !== -1) {
        const item = room.objects[index];
        if (item.id === 'corpse') {
            io.to(player.id).emit('message', { type: 'info', text: '屍體太重了。' }); return;
        }
        room.objects.splice(index, 1);
        player.inventory.push(item);
        io.to(player.id).emit('message', { type: 'info', text: `你撿起了一${item.type === 'money' ? '錠' : '個'}${item.name}。` });
    } else {
        io.to(player.id).emit('message', { type: 'error', text: '找不到東西。' });
    }
}

function equipItem(player, targetName, type) {
    const index = player.inventory.findIndex(item => (item.name.includes(targetName) || item.id === targetName) && item.type === type);
    if (index === -1) {
        io.to(player.id).emit('message', { type: 'error', text: `你沒有這個${type === 'weapon' ? '武器' : '防具'}。` }); return;
    }
    const item = player.inventory[index];
    if (player.equipment[type]) player.inventory.push(player.equipment[type]);

    player.equipment[type] = item;
    player.inventory.splice(index, 1);
    io.to(player.id).emit('message', { type: 'info', text: convert.toHtml(`\x1b[1;36m裝備了 ${item.name}。\x1b[0m`) });
}

function removeItem(player, targetName) {
    let type = null;
    if (player.equipment.weapon && player.equipment.weapon.name.includes(targetName)) type = 'weapon';
    else if (player.equipment.armor && player.equipment.armor.name.includes(targetName)) type = 'armor';

    if (type) {
        player.inventory.push(player.equipment[type]);
        io.to(player.id).emit('message', { type: 'info', text: `卸下了 ${player.equipment[type].name}。` });
        player.equipment[type] = null;
    } else {
        io.to(player.id).emit('message', { type: 'error', text: '你沒裝備這個。' });
    }
}

function performSkill(player, skillId) {
    // 查找技能
    let skill = skills[skillId];
    if (!skill) {
        // 模糊搜尋
        for (let id in skills) {
            if (skills[id].name === skillId || id === skillId) {
                skill = skills[id];
                break;
            }
        }
    }

    if (!skill) {
        io.to(player.id).emit('message', { type: 'error', text: '沒這招。輸入 skills 查看可用技能。' });
        return;
    }

    // 檢查公會限制
    if (skill.guild && (!player.guild || skill.guild !== player.guild)) {
        io.to(player.id).emit('message', { type: 'error', text: `只有 ${guilds[skill.guild]?.name || skill.guild} 可以使用此技能！` });
        return;
    }

    // 戰鬥技能需要在戰鬥中使用
    if ((skill.type === 'attack' || skill.type === 'spell' || skill.type === 'defense') && !player.combat_target) {
        io.to(player.id).emit('message', { type: 'error', text: '戰鬥中才能使用此技能！' });
        return;
    }

    // 檢查內力
    if (player.force < skill.cost) {
        io.to(player.id).emit('message', { type: 'error', text: '內力不足！' });
        return;
    }

    // 消耗內力
    player.force -= skill.cost;

    // 治療類技能
    if (skill.type === 'heal') {
        const recover = skill.hpRecover || 0;
        player.hp = Math.min(player.max_hp, player.hp + recover);
        io.to(player.id).emit('message', { type: 'info', text: convert.toHtml(`\x1b[1;32m你使用「${skill.name}」，恢復了 ${recover} 點生命值！\x1b[0m`) });
        return;
    }

    // 戰鬥技能
    if (skill.type === 'attack' || skill.type === 'spell') {
        player.next_attack_skill = skill;
        io.to(player.id).emit('message', { type: 'combat', text: convert.toHtml(`\x1b[1;33m你運起內力，準備使出「${skill.name}」！\x1b[0m`) });
        return;
    }

    // 其他技能（buff、utility等）
    io.to(player.id).emit('message', { type: 'info', text: convert.toHtml(`\x1b[1;36m你使用了「${skill.name}」！\x1b[0m`) });
}

function showStatus(player) {
    let wDmg = player.equipment.weapon ? player.equipment.weapon.damage : 0;
    let aDef = player.equipment.armor ? player.equipment.armor.defense : 0;

    const race = player.race ? races[player.race] : null;
    const guild = player.guild ? guilds[player.guild] : null;

    let status = `\n\x1b[1;37m【 ${player.name} 】\x1b[0m\n`;
    if (race) status += `種族: \x1b[1;36m${race.name}\x1b[0m  `;
    if (guild) {
        status += `公會: \x1b[1;33m${guild.name}\x1b[0m\n`;
    } else {
        status += `公會: \x1b[33m無\x1b[0m (輸入 "guilds" 查看所有公會)\n`;
    }
    status += `HP: \x1b[1;31m${player.hp}/${player.max_hp}\x1b[0m  Force: \x1b[1;34m${player.force}/${player.max_force}\x1b[0m  XP: ${player.xp}  Lv: ${player.level}\n`;
    status += `攻: ${player.level * 5 + 5}(+${wDmg})  防: ${player.level * 2}(+${aDef})\n`;
    status += `武器: ${player.equipment.weapon?.name || '無'}  防具: ${player.equipment.armor?.name || '無'}`;
    io.to(player.id).emit('message', { type: 'info', text: convert.toHtml(status) });
}

function showInventory(player) {
    let output = `\n\x1b[1;37m【 背包 】\x1b[0m\n`;
    if (player.inventory.length === 0) output += "空";
    player.inventory.forEach(i => output += ` ${i.name}\n`);
    io.to(player.id).emit('message', { type: 'info', text: convert.toHtml(output) });
}

function handleCombat(player, targetName) {
    const target = activeNpcs.find(n => n.roomId === player.room && (n.id === targetName || n.name === targetName));
    if (target) {
        player.combat_target = target.uuid;
        io.to(player.id).emit('message', { type: 'combat', text: convert.toHtml(`\x1b[1;31m開戰！目標：${target.name}\x1b[0m`) });
    } else {
        io.to(player.id).emit('message', { type: 'error', text: '找不到目標。' });
    }
}

// --- 心跳系統 ---
setInterval(() => {
    for (let playerId in players) {
        let player = players[playerId];
        if (player.force < player.max_force) player.force = Math.min(player.max_force, player.force + 2);

        if (player.combat_target) {
            let target = activeNpcs.find(n => n.uuid === player.combat_target);
            if (!target || target.roomId !== player.room) {
                player.combat_target = null; continue;
            }

            // 玩家攻擊
            let dmg = (player.level * 5 + 5) + (player.equipment.weapon ? player.equipment.weapon.damage : 0);
            let skillMod = 1;
            if (player.next_attack_skill) {
                skillMod = player.next_attack_skill.damageScale;
                player.next_attack_skill = null;
            }
            let pDamage = Math.floor(Math.max(1, (dmg - target.defense) + Math.random() * 5) * skillMod);
            target.hp -= pDamage;

            let color = skillMod > 1 ? '\x1b[1;33m' : '\x1b[37m';
            io.to(player.id).emit('message', { type: 'combat', text: convert.toHtml(`${color}你對 ${target.name} 造成 ${pDamage} 點傷害！\x1b[0m`) });

            if (target.hp <= 0) { // NPC 死
                io.to(player.id).emit('message', { type: 'system', text: convert.toHtml(`\x1b[1;31m${target.name} 死了。\x1b[0m`) });
                player.combat_target = null;
                player.xp += target.xp;
                if (player.xp >= player.level * 100) {
                    player.level++;
                    player.xp = 0;
                    calculatePlayerAttributes(player);
                    player.hp = player.max_hp;
                    player.force = player.max_force;
                    io.to(player.id).emit('message', { type: 'system', text: convert.toHtml('\x1b[1;33m恭喜升級！\x1b[0m') });
                }

                const room = rooms[player.room];
                room.objects.push({ id: 'corpse', name: '屍體', displayName: `${target.name} 的屍體`, type: 'misc' });
                if (target.loot) {
                    target.loot.forEach(itemId => {
                        if (itemDefinitions[itemId]) room.objects.push({ ...itemDefinitions[itemId], id: itemId });
                    });
                }
                activeNpcs = activeNpcs.filter(n => n.uuid !== target.uuid);
                savePlayer(player);
                continue;
            }

            // NPC 反擊
            let def = player.level * 2 + (player.equipment.armor ? player.equipment.armor.defense : 0);
            let nDamage = Math.max(1, (target.attack - def) + Math.floor(Math.random() * 5));
            player.hp -= nDamage;
            io.to(player.id).emit('message', { type: 'combat', text: convert.toHtml(`\x1b[33m${target.name} 對你造成 ${nDamage} 點傷害！\x1b[0m`) });

            if (player.hp <= 0) { // 玩家死
                io.to(player.id).emit('message', { type: 'error', text: '你死了...' });
                player.combat_target = null;
                player.hp = player.max_hp;
                player.room = 'grand_hotel';
                player.xp = Math.floor(player.xp / 2);
                savePlayer(player);
                lookRoom(player);
            }
        }
    }
}, 2000);

const PORT = 3000;
http.listen(PORT, () => { console.log(`MUD Server Running on port ${PORT}`); });