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

    normal: {
        wx: {
            title: '离开地表，和TGP去看5000光年外的星辰大海！',
            desc: '发现更大的游戏世界'
        }
    },


    gl: { // 开场引导
        type: 'popup',
        title: '欢迎来到TGP游戏世界',
        text: '这是散布在宇宙中的神秘力量，集齐所有金币，召唤神秘“鸡腿”！',
        shareble: false,
        bgType: 1
    },

    playing: { // 游戏进行中
        wx: {
            title(data) {
                return `${data.m}分${data.s}秒，我发现了${data.n}个星球！剩下的有本事你来找！`
            },
            desc: '离开地表，和TGP去看5000光年外的星辰大海！'
        }
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
        text(data) {
            return `${data.m}分${data.s}秒，我发现了所有游戏星球！宇宙辣么大，我的手最快！`
        },
        wx: {
            title(data) {
                return `${data.m}分${data.s}秒，我发现了所有游戏星球！宇宙辣么大，我的手最快！`
            },
            desc: '离开地表，和TGP去看5000光年外的星辰大海！'
        },
        bgType: 3,
        shareble: true
    },

    blacksheepwall: { // 地图全开
        type: 'popup',
        title: '探索了整个宇宙！',
        text(data) {
            return `${data.m}分${data.s}秒，我发现了${data.n}个游戏星球！剩下的有本事你来找！`
        },
        wx: {
            title(data) {
                return `${data.m}分${data.s}秒，我发现了${data.n}个游戏星球！剩下的有本事你来找！`
            },
            desc: '离开地表，和TGP去看5000光年外的星辰大海！'
        },
        bgType: 2,
        shareble: true
    },

    gg: { //地图全开 + 找到20个
        type: 'popup', 
        title: '找到全部游戏星球！',
        text(data) {
            return `${data.m}分${data.s}秒，我发现了所有游戏星球！宇宙辣么大，我的手最快！`
        },
        wx: {
            title(data) {
                return `${data.m}分${data.s}秒，我发现了所有游戏星球！宇宙辣么大，我的手最快！`
            },
            desc: '离开地表，和TGP去看5000光年外的星辰大海！'
        },
        bgType: 3,
        shareble: true
    }
}