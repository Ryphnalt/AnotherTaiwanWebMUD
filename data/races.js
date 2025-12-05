module.exports = {
    'human': {
        id: 'human',
        name: '人類',
        desc: '平衡發展的種族，各項屬性都相當平均。',
        attributeCaps: {
            hp: 500,
            force: 300,
            attack: 50,
            defense: 50
        }
    },
    
    'elf': {
        id: 'elf',
        name: '精靈',
        desc: '優雅而敏捷的種族，擁有較高的內力和魔法抗性，但生命值較低。',
        attributeCaps: {
            hp: 400,
            force: 400,
            attack: 40,
            defense: 35,
            magicResist: 30
        }
    },
    
    'dwarf': {
        id: 'dwarf',
        name: '矮人',
        desc: '強壯而堅韌的種族，擁有極高的生命值和防禦力，但移動較慢。',
        attributeCaps: {
            hp: 700,
            force: 200,
            attack: 45,
            defense: 70
        }
    },
    
    'orc': {
        id: 'orc',
        name: '獸人',
        desc: '天生戰士，擁有強大的攻擊力和生命值，但內力和防禦較弱。',
        attributeCaps: {
            hp: 650,
            force: 250,
            attack: 60,
            defense: 30
        }
    },
    
    'demon': {
        id: 'demon',
        name: '魔族',
        desc: '神秘的種族，擁有強大的內力和攻擊力，但生命值較低。',
        attributeCaps: {
            hp: 350,
            force: 500,
            attack: 55,
            defense: 25,
            magicResist: 40
        }
    }
};

