module.exports = {
    // ========== 台灣大陸地區 ==========
    
    'taipei_city': {
        name: '天龍城',
        desc: '台灣大陸第一大城，是台灣經濟與政治的中心，也是各個公會的起源地，是一座充滿科技感的城市。\n\x1b[1;36m【功能】這裡是天龍城的入口，可以前往城市內各個區域。',
        exits: {
            south: 'dream_plaza', s: 'dream_plaza',
            west: 'taichung_land', w: 'taichung_land',
            east: 'yilan_garden_forest', e: 'yilan_garden_forest'
        },
        npcs: [],
        objects: []
    },
    
    'kaohsiung_city': {
        name: '海港城',
        desc: '台灣大陸第二大城，因近海逐漸發展成港口，成為海上交通的樞紐，是許多商隊與冒險者的聚集地。\n\x1b[1;36m【功能】海港城市場繁華，可以購買各種商品。',
        exits: {
            north: 'nantou_land', n: 'nantou_land'
        },
        npcs: [],
        objects: []
    },
    
    'taoyuan_city': {
        name: '航空城',
        desc: '台灣大陸第三大城，空中交通的樞紐，是其他地區到風城的唯一入口，因為是飛行裝置的產地，可以看到天空上有著滿滿的飛行裝置。\n\x1b[1;36m【功能】可以在這裡乘坐飛行裝置前往風城。',
        exits: {
            east: 'nantou_land', e: 'nantou_land',
            north: 'hsinchu_city', n: 'hsinchu_city'
        },
        npcs: [],
        objects: []
    },
    
    'hsinchu_city': {
        name: '風城',
        desc: '一座位於天空上的城市，又稱天空之城，因長年受到強風吹拂且不易抵達，所以成為能夠操控風且喜愛寧靜的魔法師最愛的住所。\n\x1b[1;36m【功能】這裡有魔法師公會，是學習風系魔法的絕佳地點。',
        exits: {
            south: 'taoyuan_city', s: 'taoyuan_city'
        },
        npcs: [],
        objects: []
    },
    
    'tainan_city': {
        name: '古城',
        desc: '充滿古文明的城市，也是目前唯一完整保有古老特色的城市，住民都崇尚最自然的生活，拒絕與高科技為伍。\n\x1b[1;36m【功能】這裡有和尚公會，是學習傳統武術的好地方。',
        exits: {
            north: 'hualien_pass', n: 'hualien_pass'
        },
        npcs: [],
        objects: []
    },
    
    'yilan_garden_forest': {
        name: '後花園森林',
        desc: '又稱天龍城的後花園，是天龍城居民休閒時間最常去的地方，整個地區完全都被森林覆蓋，為此地蒙上了神秘的面紗。\n\x1b[1;36m【功能】可以在森林中探險，尋找隱藏的寶物。',
        exits: {
            west: 'taipei_city', w: 'taipei_city'
        },
        npcs: [],
        objects: []
    },
    
    'taichung_land': {
        name: '慶記之地',
        desc: '台灣大陸的兵器製造中心，有許多不同幫派成立的兵工廠，幫派與政府間複雜的利益糾葛，讓這邊成為了法外之地。\n\x1b[1;36m【功能】可以在這裡購買或製作武器，但要小心幫派衝突。',
        exits: {
            east: 'taipei_city', e: 'taipei_city'
        },
        npcs: [],
        objects: []
    },
    
    'nantou_land': {
        name: '無水之地',
        desc: '台灣大陸往各大城的必經之路，是一片長年缺水的土地，鮮少有生物能在這生存，是克里斯托石的產地。\n\x1b[1;36m【功能】可以在這裡挖掘克里斯托石，但要小心危險的生物。',
        exits: {
            north: 'taipei_city', n: 'taipei_city',
            south: 'kaohsiung_city', s: 'kaohsiung_city',
            west: 'taoyuan_city', w: 'taoyuan_city',
            east: 'hualien_pass', e: 'hualien_pass'
        },
        npcs: [],
        objects: []
    },
    
    'hualien_pass': {
        name: '山海隘口',
        desc: '台灣大陸的主要防衛關口，也是其他大陸要進入台灣的唯一要道，由高山跟海洋組成的天然屏障，長時間守護著台灣大陸。\n\x1b[1;36m【功能】這裡有守衛駐守，是重要的戰略地點。',
        exits: {
            west: 'nantou_land', w: 'nantou_land',
            south: 'tainan_city', s: 'tainan_city'
        },
        npcs: [],
        objects: []
    },
    
    // ========== 天龍城內部區域 ==========
    
    // 夢廣場區域（城市中心）
    'dream_plaza': {
        name: '夢廣場',
        desc: '天龍城的中心廣場，是市民聚集和商業活動的核心區域。\n\x1b[1;36m【功能】這裡是交通樞紐，可以前往城市各個區域。',
        exits: {
            north: 'taipei_city', n: 'taipei_city',
            west: 'civic_avenue_west1', w: 'civic_avenue_west1',
            east: 'civic_avenue_east1', e: 'civic_avenue_east1',
            south: 'civic_avenue_south1', s: 'civic_avenue_south1'
        },
        npcs: [],
        objects: []
    },
    
    // 市政大道北段
    'civic_avenue_north1': {
        name: '市政大道北1',
        desc: '通往市政中心的主要道路，兩旁是高聳的現代建築。',
        exits: {
            north: 'civic_avenue_north2', n: 'civic_avenue_north2',
            south: 'dream_plaza', s: 'dream_plaza'
        },
        npcs: [],
        objects: []
    },
    
    'civic_avenue_north2': {
        name: '市政大道北2',
        desc: '繼續向北延伸的市政大道，越來越接近市政中心。',
        exits: {
            north: 'civic_center', n: 'civic_center',
            south: 'civic_avenue_north1', s: 'civic_avenue_north1'
        },
        npcs: [],
        objects: []
    },
    
    'civic_center': {
        name: '市政中心',
        desc: '天龍城的政治中心，宏偉的建築展現著城市的權力與榮耀。\n\x1b[1;36m【功能】可以在這裡了解城市的最新政策。',
        exits: {
            south: 'civic_avenue_north2', s: 'civic_avenue_north2'
        },
        npcs: [],
        objects: []
    },
    
    // 市政大道西段
    'civic_avenue_west1': {
        name: '市政大道西1',
        desc: '從夢廣場向西延伸的道路，通向城市的西區。',
        exits: {
            west: 'civic_avenue_west2', w: 'civic_avenue_west2',
            east: 'dream_plaza', e: 'dream_plaza',
            north: 'equipment_shop', n: 'equipment_shop'
        },
        npcs: [],
        objects: []
    },
    
    'civic_avenue_west2': {
        name: '市政大道西2',
        desc: '繼續向西的道路，通向城市的西門。',
        exits: {
            west: 'west_gate1', w: 'west_gate1',
            east: 'civic_avenue_west1', e: 'civic_avenue_west1',
            north: 'tower101', n: 'tower101',
            south: 'item_shop', s: 'item_shop'
        },
        npcs: [],
        objects: []
    },
    
    'west_gate1': {
        name: '西1門',
        desc: '天龍城的西門之一，通往慶記之地。',
        exits: {
            west: 'taichung_land', w: 'taichung_land',
            east: 'civic_avenue_west2', e: 'civic_avenue_west2'
        },
        npcs: [],
        objects: []
    },
    
    // 市政大道東段
    'civic_avenue_east1': {
        name: '市政大道東1',
        desc: '從夢廣場向東延伸的道路，通向城市的東區。',
        exits: {
            west: 'dream_plaza', w: 'dream_plaza',
            east: 'civic_avenue_east2', e: 'civic_avenue_east2',
            north: 'knight_guild', n: 'knight_guild',
            south: 'hospital', s: 'hospital'
        },
        npcs: [],
        objects: []
    },
    
    'civic_avenue_east2': {
        name: '市政大道東2',
        desc: '繼續向東的道路，通向城市的東門。',
        exits: {
            west: 'civic_avenue_east1', w: 'civic_avenue_east1',
            east: 'east_gate1', e: 'east_gate1',
            north: 'healer_guild', n: 'healer_guild',
            south: 'training_field', s: 'training_field'
        },
        npcs: [],
        objects: []
    },
    
    'east_gate1': {
        name: '東1門',
        desc: '天龍城的東門之一，通往後花園森林。',
        exits: {
            east: 'yilan_garden_forest', e: 'yilan_garden_forest',
            west: 'civic_avenue_east2', w: 'civic_avenue_east2'
        },
        npcs: [],
        objects: []
    },
    
    // 市政大道南段
    'civic_avenue_south1': {
        name: '市政大道南1',
        desc: '從夢廣場向南延伸的道路，通向城市的南區。',
        exits: {
            north: 'dream_plaza', n: 'dream_plaza',
            south: 'civic_avenue_south2', s: 'civic_avenue_south2',
            east: 'water_plaza', e: 'water_plaza'
        },
        npcs: [],
        objects: []
    },
    
    'civic_avenue_south2': {
        name: '市政大道南2',
        desc: '繼續向南的道路，連接自由大道。',
        exits: {
            north: 'civic_avenue_south1', n: 'civic_avenue_south1',
            south: 'liberty_plaza', s: 'liberty_plaza',
            east: 'bar_alley', e: 'bar_alley'
        },
        npcs: [],
        objects: []
    },
    
    // 自由大道區域
    'liberty_plaza': {
        name: '自由廣場',
        desc: '天龍城的商業廣場，到處都是商店和攤販，充滿活力。',
        exits: {
            north: 'civic_avenue_south2', n: 'civic_avenue_south2',
            west: 'liberty_avenue_west1', w: 'liberty_avenue_west1',
            east: 'liberty_avenue_east1', e: 'liberty_avenue_east1',
            south: 'liberty_avenue_south1', s: 'liberty_avenue_south1'
        },
        npcs: [],
        objects: []
    },
    
    'liberty_avenue_west1': {
        name: '自由大道西1',
        desc: '從自由廣場向西的道路。',
        exits: {
            west: 'liberty_avenue_west2', w: 'liberty_avenue_west2',
            east: 'liberty_plaza', e: 'liberty_plaza',
            north: 'grand_hotel', n: 'grand_hotel'
        },
        npcs: [],
        objects: []
    },
    
    'liberty_avenue_west2': {
        name: '自由大道西2',
        desc: '繼續向西的道路，通向城市的西2門。',
        exits: {
            west: 'west_gate2', w: 'west_gate2',
            east: 'liberty_avenue_west1', e: 'liberty_avenue_west1'
        },
        npcs: [],
        objects: []
    },
    
    'west_gate2': {
        name: '西2門',
        desc: '天龍城的西2門，同樣通往慶記之地。',
        exits: {
            west: 'taichung_land', w: 'taichung_land',
            east: 'liberty_avenue_west2', e: 'liberty_avenue_west2'
        },
        npcs: [],
        objects: []
    },
    
    'liberty_avenue_east1': {
        name: '自由大道東1',
        desc: '從自由廣場向東的道路。',
        exits: {
            west: 'liberty_plaza', w: 'liberty_plaza',
            east: 'liberty_avenue_east2', e: 'liberty_avenue_east2',
            south: 'michelin_restaurant', s: 'michelin_restaurant'
        },
        npcs: [],
        objects: []
    },
    
    'liberty_avenue_east2': {
        name: '自由大道東2',
        desc: '繼續向東的道路，通向城市的東2門。',
        exits: {
            west: 'liberty_avenue_east1', w: 'liberty_avenue_east1',
            east: 'east_gate2', e: 'east_gate2'
        },
        npcs: [],
        objects: []
    },
    
    'east_gate2': {
        name: '東2門',
        desc: '天龍城的東2門，同樣通往後花園森林。',
        exits: {
            east: 'yilan_garden_forest', e: 'yilan_garden_forest',
            west: 'liberty_avenue_east2', w: 'liberty_avenue_east2'
        },
        npcs: [],
        objects: []
    },
    
    'liberty_avenue_south1': {
        name: '自由大道南1',
        desc: '從自由廣場向南的道路。',
        exits: {
            north: 'liberty_plaza', n: 'liberty_plaza',
            south: 'liberty_avenue_south2', s: 'liberty_avenue_south2'
        },
        npcs: [],
        objects: []
    },
    
    'liberty_avenue_south2': {
        name: '自由大道南2',
        desc: '繼續向南的道路，連接地鐵站。',
        exits: {
            north: 'liberty_avenue_south1', n: 'liberty_avenue_south1',
            south: 'south_gate', s: 'south_gate',
            east: 'mrt_taipei_station', e: 'mrt_taipei_station'
        },
        npcs: [],
        objects: []
    },
    
    'south_gate': {
        name: '南大門',
        desc: '天龍城的南門，通往無水之地。',
        exits: {
            north: 'liberty_avenue_south2', n: 'liberty_avenue_south2',
            south: 'nantou_land', s: 'nantou_land'
        },
        npcs: [],
        objects: []
    },
    
    // ========== 特殊場所 ==========
    
    'equipment_shop': {
        name: '裝備店',
        desc: '販賣各種裝備的商店，從基礎裝備到高級裝備應有盡有。\n\x1b[1;36m【功能】可以在這裡購買或出售裝備。',
        exits: {
            south: 'civic_avenue_west1', s: 'civic_avenue_west1'
        },
        npcs: [],
        objects: []
    },
    
    'tower101': {
        name: '101試煉塔',
        desc: '高聳入雲的試煉塔，是冒險者們測試實力的地方。\n\x1b[1;36m【功能】可以在這裡挑戰試煉，獲得豐厚獎勵。',
        exits: {
            south: 'civic_avenue_west2', s: 'civic_avenue_west2'
        },
        npcs: [],
        objects: []
    },
    
    'item_shop': {
        name: '道具店',
        desc: '販賣各種消耗道具的商店。\n\x1b[1;36m【功能】可以在這裡購買藥水、食物等道具。',
        exits: {
            north: 'civic_avenue_west2', n: 'civic_avenue_west2'
        },
        npcs: [],
        objects: []
    },
    
    'water_plaza': {
        name: '水舞廣場',
        desc: '美麗的水舞廣場，是市民休閒的好地方。',
        exits: {
            west: 'civic_avenue_south1', w: 'civic_avenue_south1'
        },
        npcs: [],
        objects: []
    },
    
    'hospital': {
        name: '醫院',
        desc: '天龍城的主要醫院，提供醫療服務。\n\x1b[1;36m【功能】可以在這裡恢復生命值。',
        exits: {
            north: 'civic_avenue_east1', n: 'civic_avenue_east1'
        },
        npcs: [],
        objects: []
    },
    
    'training_field': {
        name: '訓練場',
        desc: '專門用於訓練的場地，有訓練假人供練習。\n\x1b[1;36m【功能】可以在這裡安全地練習技能。',
        exits: {
            north: 'civic_avenue_east2', n: 'civic_avenue_east2'
        },
        npcs: ['training_dummy'],
        objects: []
    },
    
    'bar_alley': {
        name: '酒吧後巷',
        desc: '連接傷心酒吧的後巷，有些陰暗。',
        exits: {
            north: 'sad_bar', n: 'sad_bar',
            west: 'civic_avenue_south2', w: 'civic_avenue_south2'
        },
        npcs: [],
        objects: []
    },
    
    'sad_bar': {
        name: '傷心酒吧',
        desc: '天龍城著名的酒吧，是冒險者們聚集交流的地方。\n\x1b[1;36m【功能】可以在這裡購買飲料恢復體力，也可以打聽情報。',
        exits: {
            south: 'bar_alley', s: 'bar_alley'
        },
        npcs: [],
        objects: []
    },
    
    'grand_hotel': {
        name: '圓山飯店',
        desc: '天龍城最豪華的飯店，提供住宿服務。\n\x1b[1;36m【功能】可以在這裡休息，輸入 save 存檔並恢復體力。',
        exits: {
            south: 'liberty_avenue_west1', s: 'liberty_avenue_west1',
            north: 'hotel_backdoor', n: 'hotel_backdoor'
        },
        npcs: [],
        objects: []
    },
    
    'hotel_backdoor': {
        name: '飯店後門',
        desc: '圓山飯店的後門，通向後門小巷。',
        exits: {
            south: 'grand_hotel', s: 'grand_hotel',
            west: 'back_alley', w: 'back_alley'
        },
        npcs: [],
        objects: []
    },
    
    'back_alley': {
        name: '後門小巷',
        desc: '連接飯店後門的小巷，通向市政大道。',
        exits: {
            east: 'hotel_backdoor', e: 'hotel_backdoor',
            east: 'civic_avenue_west2', e: 'civic_avenue_west2'
        },
        npcs: [],
        objects: []
    },
    
    'michelin_restaurant': {
        name: '米其林餐廳',
        desc: '天龍城最頂級的餐廳，提供精緻美食。\n\x1b[1;36m【功能】可以在這裡購買高級食物恢復大量體力。',
        exits: {
            north: 'liberty_avenue_east1', n: 'liberty_avenue_east1'
        },
        npcs: [],
        objects: []
    },
    
    'mrt_taipei_station': {
        name: '嗚泊車站天龍站',
        desc: '天龍城的交通樞紐，可以快速前往城市各個區域。\n\x1b[1;36m【功能】可以通過地鐵快速移動。',
        exits: {
            west: 'liberty_avenue_south2', w: 'liberty_avenue_south2'
        },
        npcs: [],
        objects: []
    },
    
    // ========== 公會區域 ==========
    
    'knight_guild': {
        name: '騎士公會',
        desc: '宏偉的騎士大廳，牆上掛滿了各種武器和盔甲。\n\x1b[1;36m【功能】輸入 "join knight" 加入騎士公會。加入條件：等級 3，經驗 200。',
        exits: {
            south: 'civic_avenue_east1', s: 'civic_avenue_east1'
        },
        npcs: [],
        objects: [],
        guild: 'knight'
    },
    
    'healer_guild': {
        name: '醫生公會',
        desc: '充滿草藥香氣的醫館，各種藥材整齊排列。\n\x1b[1;36m【功能】輸入 "join healer" 加入醫生公會。加入條件：等級 2，經驗 100。',
        exits: {
            south: 'civic_avenue_east2', s: 'civic_avenue_east2'
        },
        npcs: [],
        objects: [],
        guild: 'healer'
    },
    
    'adventurer_guild': {
        name: '探險者公會',
        desc: '一個充滿冒險氛圍的大廳，牆上掛滿了各種地圖和探險工具。\n\x1b[1;36m【功能】輸入 "join adventurer" 加入探險者公會。加入條件：等級 1。',
        exits: {
            south: 'civic_avenue_east2', s: 'civic_avenue_east2'
        },
        npcs: [],
        objects: [],
        guild: 'adventurer'
    },
    
    'scholar_guild': {
        name: '書生公會',
        desc: '書香四溢的書院，到處都是書籍和字畫。\n\x1b[1;36m【功能】輸入 "join scholar" 加入書生公會。加入條件：等級 1，經驗 50。',
        exits: {
            west: 'sad_bar', w: 'sad_bar'
        },
        npcs: [],
        objects: [],
        guild: 'scholar'
    },
    
    'thief_guild': {
        name: '盜賊公會',
        desc: '陰暗的地下室，空氣中瀰漫著神秘的氣息。\n\x1b[1;36m【功能】輸入 "join thief" 加入盜賊公會。加入條件：等級 2，經驗 100。',
        exits: {
            east: 'back_alley', e: 'back_alley'
        },
        npcs: [],
        objects: [],
        guild: 'thief'
    },
    
    'mage_guild': {
        name: '魔法師公會',
        desc: '神秘的魔法塔，周圍環繞著魔法能量。\n\x1b[1;36m【功能】輸入 "join mage" 加入魔法師公會。加入條件：等級 5，經驗 500。',
        exits: {
            south: 'hsinchu_city', s: 'hsinchu_city'
        },
        npcs: [],
        objects: [],
        guild: 'mage'
    },
    
    'monk_guild': {
        name: '和尚公會',
        desc: '莊嚴肅穆的寺廟，香火繚繞。\n\x1b[1;36m【功能】輸入 "join monk" 加入和尚公會。加入條件：等級 5，經驗 500。',
        exits: {
            north: 'tainan_city', n: 'tainan_city'
        },
        npcs: [],
        objects: [],
        guild: 'monk'
    }
};
