module.exports = {
    // ========== 城鎮 NPC ==========
    'guard': {
        id: 'guard', 
        name: '官兵', 
        desc: '手持長槍的士兵。',
        hp: 100, max_hp: 100, attack: 15, defense: 5, xp: 100,
        loot: ['coin', 'cloth']
    },
    
    'gate_guard': {
        id: 'gate_guard',
        name: '守門士兵',
        desc: '守衛城門的士兵，看起來很強壯。',
        hp: 150, max_hp: 150, attack: 20, defense: 8, xp: 150,
        loot: ['coin', 'coin', 'leather_armor']
    },
    
    'thief': {
        id: 'thief', 
        name: '小偷', 
        desc: '鬼鬼祟祟的傢伙。',
        hp: 60, max_hp: 60, attack: 20, defense: 0, xp: 50,
        loot: ['coin', 'sword']
    },
    
    'bandit': {
        id: 'bandit',
        name: '強盜',
        desc: '面目猙獰的強盜，手中握著大刀。',
        hp: 120, max_hp: 120, attack: 25, defense: 3, xp: 120,
        loot: ['coin', 'coin', 'leather_armor']
    },
    
    'shopkeeper': {
        id: 'shopkeeper', 
        name: '店小二', 
        desc: '笑臉迎人的店小二。',
        hp: 1000, max_hp: 1000, attack: 50, defense: 50, xp: 0,
        is_vendor: true,
        vendor_goods: ['bread', 'wine']
    },
    
    // ========== 野外 NPC ==========
    'wolf': {
        id: 'wolf',
        name: '野狼',
        desc: '目露凶光的野狼，低吼著露出獠牙。',
        hp: 80, max_hp: 80, attack: 18, defense: 2, xp: 80,
        loot: ['coin', 'wolf_pelt']
    },
    
    'bear': {
        id: 'bear',
        name: '熊怪',
        desc: '巨大的黑熊，站起來有兩人高。',
        hp: 200, max_hp: 200, attack: 30, defense: 10, xp: 250,
        loot: ['coin', 'coin', 'bear_claw']
    },
    
    'treant': {
        id: 'treant',
        name: '樹精',
        desc: '古老的樹精，樹幹上似乎有眼睛在盯著你。',
        hp: 180, max_hp: 180, attack: 25, defense: 15, xp: 220,
        loot: ['coin', 'herb']
    },
    
    'water_spirit': {
        id: 'water_spirit',
        name: '水精靈',
        desc: '透明的水精靈，由河水凝聚而成。',
        hp: 150, max_hp: 150, attack: 22, defense: 5, xp: 180,
        loot: ['coin', 'pearl']
    },
    
    'water_guardian': {
        id: 'water_guardian',
        name: '瀑布守護者',
        desc: '守護瀑布的古老精靈，散發著強大氣息。',
        hp: 300, max_hp: 300, attack: 35, defense: 18, xp: 400,
        loot: ['coin', 'coin', 'water_amulet']
    },
    
    // ========== 洞穴 NPC ==========
    'cave_spider': {
        id: 'cave_spider',
        name: '洞穴蜘蛛',
        desc: '巨大的蜘蛛，眼睛在黑暗中發著紅光。',
        hp: 120, max_hp: 120, attack: 28, defense: 5, xp: 150,
        loot: ['coin', 'spider_silk']
    },
    
    'orc_warrior': {
        id: 'orc_warrior',
        name: '獸人戰士',
        desc: '強壯的獸人戰士，手持戰斧。',
        hp: 350, max_hp: 350, attack: 45, defense: 20, xp: 500,
        loot: ['coin', 'coin', 'iron_sword']
    },
    
    'cave_troll': {
        id: 'cave_troll',
        name: '洞穴巨魔',
        desc: '巨大的巨魔，皮膚堅硬如石。',
        hp: 500, max_hp: 500, attack: 50, defense: 30, xp: 800,
        loot: ['coin', 'coin', 'troll_skin']
    },
    
    // ========== BOSS ==========
    'boss': {
        id: 'boss', 
        name: '獨孤求敗', 
        desc: '一代劍魔，散發著恐怖的氣息。',
        hp: 1000, max_hp: 1000, attack: 80, defense: 50, xp: 5000,
        loot: ['god_sword']
    },
    
    // ========== 特殊 NPC ==========
    'training_dummy': {
        id: 'training_dummy',
        name: '訓練假人',
        desc: '木製的訓練假人，不會反擊。',
        hp: 9999, max_hp: 9999, attack: 0, defense: 0, xp: 1,
        loot: []
    }
};
