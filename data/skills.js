module.exports = {
    // ========== 通用技能 ==========
    'power_strike': {
        name: '力劈華山',
        desc: '凝聚全身氣力的一擊。',
        cost: 20,
        damageScale: 2.5,
        guild: null // 所有公會可用
    },
    
    // ========== 冒險者技能 ==========
    'make_jerky': {
        name: '製肉乾',
        desc: '將生肉製成肉乾，可以保存更久。',
        cost: 10,
        guild: 'adventurer',
        type: 'utility'
    },
    
    'pitch_tent': {
        name: '搭帳篷',
        desc: '在野外搭建帳篷，可以快速恢復體力。',
        cost: 15,
        guild: 'adventurer',
        type: 'utility'
    },
    
    'explore': {
        name: '探索',
        desc: '探索隱藏的區域和通道。',
        cost: 5,
        guild: 'adventurer',
        type: 'utility'
    },
    
    // ========== 騎士技能 ==========
    'dual_wield': {
        name: '雙手武器',
        desc: '同時使用兩把武器，大幅提升攻擊力。',
        cost: 0,
        guild: 'knight',
        type: 'passive',
        attackBonus: 0.5 // 第二把武器50%傷害
    },
    
    'tactical_defense': {
        name: '戰術防禦',
        desc: '運用戰術和盾牌技巧，大幅提升防禦力。',
        cost: 30,
        guild: 'knight',
        type: 'buff',
        defenseBonus: 20,
        duration: 10
    },
    
    'charge': {
        name: '衝鋒',
        desc: '騎馬衝向敵人，造成大量傷害。',
        cost: 40,
        guild: 'knight',
        type: 'attack',
        damageScale: 3.0
    },
    
    'parry': {
        name: '招架',
        desc: '用武器招架敵人的攻擊。',
        cost: 15,
        guild: 'knight',
        type: 'defense',
        blockChance: 0.5
    },
    
    // ========== 醫生技能 ==========
    'acupuncture': {
        name: '針灸',
        desc: '用銀針刺激穴位，恢復生命值和內力。',
        cost: 20,
        guild: 'healer',
        type: 'heal',
        hpRecover: 100,
        forceRecover: 50
    },
    
    'bandage': {
        name: '繃帶',
        desc: '使用繃帶包紮傷口，快速恢復生命值。',
        cost: 10,
        guild: 'healer',
        type: 'heal',
        hpRecover: 80
    },
    
    'heal': {
        name: '醫療',
        desc: '強力的醫療技能，可以恢復大量生命值。',
        cost: 30,
        guild: 'healer',
        type: 'heal',
        hpRecover: 200
    },
    
    'first_aid': {
        name: '急救',
        desc: '急救瀕死的玩家，恢復至安全狀態。',
        cost: 50,
        guild: 'healer',
        type: 'heal',
        hpRecover: 150,
        minHpRequired: 1
    },
    
    'surgery': {
        name: '手術',
        desc: '與死神搶生意，救回已死的玩家。',
        cost: 100,
        guild: 'healer',
        type: 'resurrect',
        resurrect: true
    },
    
    'anatomy': {
        name: '解剖學',
        desc: '運用對人體結構的了解，攻擊敵人弱點。',
        cost: 0,
        guild: 'healer',
        type: 'passive',
        attackBonus: 0.3
    },
    
    'herbalism': {
        name: '藥學',
        desc: '配製各種藥物，恢復生命值或提升能力。',
        cost: 25,
        guild: 'healer',
        type: 'utility'
    },
    
    // ========== 魔法師技能 ==========
    'fireball': {
        name: '火球術',
        desc: '發射一個巨大的火球，造成大量魔法傷害。',
        cost: 40,
        guild: 'mage',
        type: 'spell',
        damageScale: 3.5,
        element: 'fire'
    },
    
    'ice_bolt': {
        name: '冰箭術',
        desc: '發射冰箭，造成魔法傷害並可能冰凍敵人。',
        cost: 35,
        guild: 'mage',
        type: 'spell',
        damageScale: 3.0,
        element: 'ice',
        slowChance: 0.3
    },
    
    'magic_shield': {
        name: '魔法護盾',
        desc: '創造一個魔法護盾，大幅提升防禦力。',
        cost: 50,
        guild: 'mage',
        type: 'buff',
        defenseBonus: 15,
        magicResist: 30,
        duration: 15
    },
    
    'astral_gate': {
        name: '星界之門',
        desc: '打開星界之門，可以在各大陸間穿梭自如。',
        cost: 100,
        guild: 'mage',
        type: 'teleport'
    },
    
    'magic_box': {
        name: '魔法方塊',
        desc: '創造一個魔法儲物空間，大幅增加載重量。',
        cost: 0,
        guild: 'mage',
        type: 'passive',
        capacityBonus: 50
    },
    
    'teleport': {
        name: '傳送',
        desc: '瞬間移動到指定地點。',
        cost: 60,
        guild: 'mage',
        type: 'teleport'
    },
    
    // ========== 小偷技能 ==========
    'backstab': {
        name: '背刺',
        desc: '從背後偷襲敵人，造成致命傷害。全ES威力最大的特技。',
        cost: 50,
        guild: 'thief',
        type: 'attack',
        damageScale: 5.0,
        requireStealth: true
    },
    
    'steal': {
        name: '偷竊',
        desc: '從敵人身上偷取物品。',
        cost: 20,
        guild: 'thief',
        type: 'utility'
    },
    
    'sneak': {
        name: '潛行',
        desc: '隱藏行蹤，敵人難以發現。',
        cost: 25,
        guild: 'thief',
        type: 'buff',
        stealth: true,
        duration: 30
    },
    
    'pick_lock': {
        name: '開鎖',
        desc: '使用技巧打開鎖住的門或箱子。',
        cost: 15,
        guild: 'thief',
        type: 'utility'
    },
    
    // ========== 書生技能 ==========
    'sword_art': {
        name: '劍法',
        desc: '從古代詩詞中領悟的劍法，威力強大。',
        cost: 30,
        guild: 'scholar',
        type: 'attack',
        damageScale: 2.8
    },
    
    'tactics': {
        name: '戰術',
        desc: '運用戰術知識，大幅提高普通攻擊力。',
        cost: 0,
        guild: 'scholar',
        type: 'passive',
        attackBonus: 0.4
    },
    
    'summon': {
        name: '召喚',
        desc: '召喚精靈協助戰鬥，提高攻擊力或防禦力。',
        cost: 60,
        guild: 'scholar',
        type: 'buff',
        attackBonus: 15,
        defenseBonus: 10,
        duration: 20
    },
    
    'formation': {
        name: '陣法',
        desc: '多人組成的陣法，威力隨人數而增。',
        cost: 40,
        guild: 'scholar',
        type: 'buff',
        formationBonus: 0.2 // 每個隊友增加20%
    },
    
    'poetry_sword': {
        name: '詩劍',
        desc: '以詩意入劍，劍法更加精妙。',
        cost: 45,
        guild: 'scholar',
        type: 'attack',
        damageScale: 3.5
    },
    
    // ========== 和尚技能 ==========
    'seventy_two_arts': {
        name: '七十二絕技',
        desc: '少林寺七十二項絕技，威力強大，大部分敵人無法抵擋。',
        cost: 60,
        guild: 'monk',
        type: 'attack',
        damageScale: 4.0
    },
    
    'internal_power': {
        name: '內力震傷',
        desc: '運用深厚內力震傷敵人，造成持續傷害。',
        cost: 50,
        guild: 'monk',
        type: 'attack',
        damageScale: 2.5,
        dotDamage: 10,
        dotDuration: 5
    },
    
    'point_strike': {
        name: '點穴',
        desc: '點擊敵人穴道，停止對手數回合攻擊。',
        cost: 40,
        guild: 'monk',
        type: 'debuff',
        stunDuration: 3
    },
    
    'healing_sutra': {
        name: '醫療心經',
        desc: '運用本身內力醫療傷害。',
        cost: 35,
        guild: 'monk',
        type: 'heal',
        hpRecover: 120,
        forceCost: 35
    },
    
    'vajra_staff': {
        name: '金剛杖法',
        desc: '少林寺金剛杖法，攻擊力可與書生一較高低。',
        cost: 55,
        guild: 'monk',
        type: 'attack',
        damageScale: 3.8
    }
};
