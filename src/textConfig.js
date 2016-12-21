export default {
    loading: {
        texts: [
            [
                ['欢迎来到TGP游戏世界'],
                ['欢迎来到TGP游戏世界'],
                ['欢迎来到TGP游戏世界'],
                ['欢迎来到TGP游戏世界']
            ],
            [
                ['欢迎来到TGP游戏世界'],
                ['欢迎来到TGP游戏世界'],
                ['欢迎来到TGP游戏世界']
            ],
            [
                ['欢迎来到TGP游戏世界'],
                ['欢迎来到TGP游戏世界'],
                ['欢迎来到TGP游戏世界'],
                ['欢迎来到TGP游戏世界'],
                ['欢迎来到TGP游戏世界']
            ],
            [
                ['欢迎来到TGP游戏世界'],
                ['欢迎来到TGP游戏世界'],
                ['欢迎来到TGP游戏世界'],
                ['欢迎来到TGP游戏世界']
            ]   
        ]
    },

    gl: { // 开场引导
        type: 'popup',
        title: '欢迎来到TGP游戏世界',
        text: '散布在宇宙中的神秘力量，找到他们，神秘“鸡腿”在等你',
        shareble: false,
        bgType: 1
    },

    found5: { // 找到5个
        type: 'tip',
        tip: '赞！已发现5个游戏星球。<br/>神秘”鸡腿”就在星空深处，等你哟！',
        bgType: 1
    },

    found15: { // 找到15个
        type: 'tip',
        tip: '啊！还差5个！<br/>离“鸡腿”还差5个！',
        bgType: 2
    },

    found20: { // 找到20个
        type: 'popup',
        title: '找到全部游戏星球！',
        text: '我去！你还真找全了！<br/>给跪，请收下我的鸡腿！',
        bgType: 3,
        shareble: true
    },

    blacksheepwall: { // 地图全开
        type: 'popup',
        title: '探索了整个宇宙！',
        text: '勤奋的少年，宇宙是不是充满了奥妙，去TGP的游戏世界，那里也是一样。',
        bgType: 2,
        shareble: true
    },

    gg: { //地图全开 + 找到20个
        type: 'popup', 
        title: '找到全部游戏星球！',
        text: '至此你已看完，奥妙的宇宙和纷繁的TGP世界，你可以去分享了。',
        bgType: 3,
        shareble: true
    }
}