export default {
    loading: {
        texts: [
            [
                '正在加入：',
                '5滴银河',
                '2束逃不出黑洞的光',
                '1个更大的游戏世界',
                '3缕太阳风',
                '7片燃烧的陨石',
                '1个仰望星空的人'
            ]
        ]
    },

    gl: { // 开场引导
        type: 'popup',
        title: '欢迎来到TGP游戏世界',
        text: '这是散布在宇宙中的神秘力量，集齐所有金币，召唤神秘“鸡腿”！',
        shareble: false,
        bgType: 1
    },

    found5: { // 找到5个
        type: 'tip',
        tip: '5颗星球被你点金，<br/>神秘”鸡腿”正向你走来',
        bgType: 1
    },

    found15: { // 找到15个
        type: 'tip',
        tip: '啊！还差5个！<br/>离神秘“鸡腿”就只差5个了！',
        bgType: 2
    },

    found20: { // 找到20个
        type: 'popup',
        title: '找到全部游戏星球！',
        text: '给跪！你还真点完了！来吧，鸡腿送你！<br/>现在去TGP发现更大的游戏世界！',
        bgType: 3,
        shareble: true
    },

    blacksheepwall: { // 地图全开
        type: 'popup',
        title: '探索了整个宇宙！',
        text: '勤奋的少年，你已走遍宇宙。<br/>但是，星空深处的秘密还在等着你！再去看看？',
        bgType: 2,
        shareble: true
    },

    gg: { //地图全开 + 找到20个
        type: 'popup', 
        title: '找到全部游戏星球！',
        text: '腿给你，手借我，点击分享！<br/>让更多探索者，一起来发现更大的游戏世界',
        bgType: 3,
        shareble: true
    }
}