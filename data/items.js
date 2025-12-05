module.exports = {
    // ========== 基礎物品 ==========
    'corpse': { 
        name: '屍體', 
        type: 'misc', 
        desc: '一具冰冷的屍體。' 
    },
    
    'coin': { 
        name: '銀兩', 
        type: 'money', 
        value: 10, 
        desc: '通用的貨幣。' 
    },
    
    // ========== 武器 ==========
    'sword': { 
        name: '鐵劍', 
        type: 'weapon', 
        damage: 15, 
        price: 100, 
        desc: '一把鋒利的鐵劍。(輸入 wield sword 裝備)' 
    },
    
    'iron_sword': {
        name: '鋼鐵長劍',
        type: 'weapon',
        damage: 30,
        price: 300,
        desc: '精鋼打造的長劍，鋒利異常。(輸入 wield iron_sword 裝備)'
    },
    
    'god_sword': {
        name: '玄鐵重劍',
        type: 'weapon',
        damage: 100,
        desc: '重達八十一斤的神兵利器，只有強者才能揮動。(輸入 wield god_sword 裝備)'
    },
    
    // ========== 防具 ==========
    'cloth': { 
        name: '布衣', 
        type: 'armor', 
        defense: 5, 
        price: 50, 
        desc: '普通的粗布衣服。(輸入 wear cloth 穿戴)' 
    },
    
    'leather_armor': {
        name: '皮甲',
        type: 'armor',
        defense: 12,
        price: 150,
        desc: '堅韌的皮製盔甲，提供良好防護。(輸入 wear leather_armor 穿戴)'
    },
    
    // ========== 食物 ==========
    'bread': { 
        name: '饅頭', 
        type: 'food', 
        price: 5, 
        recover: 50, 
        desc: '香噴噴的熱饅頭，可以恢復 50 點生命值。' 
    },
    
    'wine': {
        name: '酒',
        type: 'food',
        price: 10,
        recover: 30,
        desc: '香醇的美酒，可以恢復 30 點生命值和內力。'
    },
    
    'herb': {
        name: '靈草',
        type: 'food',
        price: 30,
        recover: 100,
        desc: '珍貴的靈草，可以恢復 100 點生命值。'
    },
    
    // ========== 材料物品 ==========
    'wolf_pelt': {
        name: '狼皮',
        type: 'misc',
        price: 20,
        desc: '從野狼身上取得的毛皮，可以用來製作裝備。'
    },
    
    'bear_claw': {
        name: '熊爪',
        type: 'misc',
        price: 50,
        desc: '巨大的熊爪，鋒利無比，可以當作武器材料。'
    },
    
    'pearl': {
        name: '珍珠',
        type: 'misc',
        price: 100,
        desc: '閃閃發光的珍珠，價值不菲。'
    },
    
    'water_amulet': {
        name: '水之護符',
        type: 'misc',
        price: 200,
        desc: '蘊含水元素力量的護符，可能對戰鬥有幫助。'
    },
    
    'spider_silk': {
        name: '蜘蛛絲',
        type: 'misc',
        price: 40,
        desc: '堅韌的蜘蛛絲，可以用來製作特殊裝備。'
    },
    
    'troll_skin': {
        name: '巨魔皮',
        type: 'misc',
        price: 150,
        desc: '堅硬如石的巨魔皮，是製作高級防具的材料。'
    }
};
