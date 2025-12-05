module.exports = {
    'adventurer': {
        id: 'adventurer',
        name: '冒險者',
        desc: '冒險者的能力主要是在探索新區域，他們沒有嚴格的戰技訓練，也不會任何魔法，但是世界上沒有任何困難的地形能阻擋住一位好奇的冒險者。',
        // 地圖位置
        location: 'adventurer_guild',
        locationName: '冒險者公會',
        // 加入條件
        joinRequirements: {
            level: 1, // 最低等級
            xp: 0,    // 最低經驗值
            item: null // 需要的物品（null表示不需要）
        },
        // 屬性加成
        attributeBonus: {
            hp: 50,
            force: 30,
            defense: 5
        },
        // 屬性上限加成
        attributeCapBonus: {
            hp: 100,
            force: 50
        },
        // 專屬技能
        skills: ['make_jerky', 'pitch_tent', 'explore'],
        // 專屬特性
        features: [
            '可以探索隱藏區域',
            '可以製作肉乾',
            '可以搭帳篷休息'
        ]
    },
    
    'knight': {
        id: 'knight',
        name: '騎士',
        desc: '騎士通常接受極為嚴格的武器技能訓練，他們能夠使用最沈重的武器，穿著最厚重的鎧甲，站在兇猛的敵人面前作戰。',
        location: 'knight_guild',
        locationName: '騎士公會',
        joinRequirements: {
            level: 3,
            xp: 200,
            item: null
        },
        attributeBonus: {
            hp: 150,
            force: 20,
            attack: 10,
            defense: 15
        },
        attributeCapBonus: {
            hp: 300,
            force: 30
        },
        skills: ['dual_wield', 'tactical_defense', 'charge', 'parry'],
        features: [
            '可以雙手各持一把武器',
            '戰術防禦大幅提升',
            '可以騎馬衝撞敵人',
            '可以裝備重型武器和盔甲'
        ]
    },
    
    'healer': {
        id: 'healer',
        name: '醫生',
        desc: '行醫者對人體的結構有相當深入的認識，他們能用一根小小的銀針為人針灸，並且對受傷的人做最妥善的處理。',
        location: 'healer_guild',
        locationName: '醫者公會',
        joinRequirements: {
            level: 2,
            xp: 100,
            item: null
        },
        attributeBonus: {
            hp: 80,
            force: 50,
            defense: 3
        },
        attributeCapBonus: {
            hp: 150,
            force: 100
        },
        skills: ['acupuncture', 'bandage', 'heal', 'first_aid', 'surgery', 'anatomy', 'herbalism'],
        features: [
            '強大的醫療技能',
            '針灸技能用途廣泛',
            '可以急救瀕死玩家',
            '可以手術復活已死玩家',
            '解剖學大幅增加攻擊力',
            '可以配製各種藥物'
        ]
    },
    
    'mage': {
        id: 'mage',
        name: '魔法師',
        desc: '魔法師長年研究魔法，因此擁有各式各樣強力的法術，對於武器的使用並不擅長，但是附有魔法的魔杖型武器在魔法師手中往往具有極其可怕的威力。',
        location: 'mage_guild',
        locationName: '魔法師公會',
        joinRequirements: {
            level: 5,
            xp: 500,
            item: null
        },
        attributeBonus: {
            hp: -50,
            force: 100,
            attack: -5,
            defense: -5,
            magicResist: 20
        },
        attributeCapBonus: {
            hp: 50,
            force: 200
        },
        skills: ['fireball', 'ice_bolt', 'magic_shield', 'astral_gate', 'magic_box', 'teleport'],
        features: [
            '強大的法術攻擊',
            '魔法護盾加強防護',
            '星界之門可在各地穿梭',
            '魔法方塊增加載重量',
            '對特殊攻擊有較強抗力',
            '但物理防禦較弱'
        ]
    },
    
    'thief': {
        id: 'thief',
        name: '小偷',
        desc: '小偷是世界上最古老的行業之一，只要有財富的地方，都會有敬業的小偷努力的工作，他們喜歡從事財富的交換、流通和促進經濟的交流。',
        location: 'thief_guild',
        locationName: '盜賊公會',
        joinRequirements: {
            level: 2,
            xp: 100,
            item: null
        },
        attributeBonus: {
            hp: 30,
            force: 40,
            attack: 5,
            defense: 2,
            stealth: 30
        },
        attributeCapBonus: {
            hp: 80,
            force: 80
        },
        skills: ['backstab', 'steal', 'sneak', 'pick_lock'],
        features: [
            '行蹤隱秘，獨來獨往',
            '背刺是威力最大的技能',
            '可以偷取物品',
            '可以潛行'
        ]
    },
    
    'scholar': {
        id: 'scholar',
        name: '書生',
        desc: '書生們除了懂得朗頌閱讀之外，也舞劍強身，更由於精通古文學，故能從古代詩詞賦中領悟出包含不同劍意的劍法來。',
        location: 'scholar_guild',
        locationName: '書生公會',
        joinRequirements: {
            level: 1,
            xp: 50,
            item: null
        },
        attributeBonus: {
            hp: 60,
            force: 60,
            attack: 8,
            defense: 5
        },
        attributeCapBonus: {
            hp: 120,
            force: 120
        },
        skills: ['sword_art', 'tactics', 'summon', 'formation', 'poetry_sword'],
        features: [
            '強力劍法配合戰術',
            '可以召喚精靈',
            '多人陣法提高戰鬥力',
            '劍法威力隨等級提升',
            '自給自足的能力'
        ]
    },
    
    'monk': {
        id: 'monk',
        name: '和尚',
        desc: '少林寺號稱東方的常勝不敗門派，其寺內典存了數以百計的武功典籍，尤其是少林寺之七十二項絕技和易筋經，向來被東方武林目為至高無上的武術寶典。',
        location: 'monk_guild',
        locationName: '和尚公會',
        joinRequirements: {
            level: 5,
            xp: 500,
            item: null
        },
        attributeBonus: {
            hp: 120,
            force: 80,
            attack: 12,
            defense: 8
        },
        attributeCapBonus: {
            hp: 200,
            force: 150
        },
        skills: ['seventy_two_arts', 'internal_power', 'point_strike', 'healing_sutra', 'vajra_staff'],
        features: [
            '七十二絕技威力強大',
            '內力震傷大部分敵人無法抵擋',
            '點穴可停止對手攻擊',
            '醫療心經可運用內力醫療',
            '金剛杖法攻擊力強大'
        ]
    }
};

