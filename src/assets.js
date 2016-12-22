import {os} from 'amfe-env';
import sliceConfig from './sliceConfig';

const assetsPrefix = os.isIOS ? '2x' : '1x';

export const preload = {
    path: `assets/${assetsPrefix}/preload/`,
    manifest: [
        {id: 'bg1', src: 'bg1.jpg'},
        {id: 'bg2', src: 'bg2.jpg'}
    ]
};

const openingManifest = [{
    id: 'openingChicken', src: 'chicken.png'
}];
const openingFrameCount = 30;
const openingStarCount = 3;
for (let i = 1; i <= openingFrameCount; i++) {
    openingManifest.push({
        id: `opening${i}`,
        src: `${i}.png`
    });
}

for (let i = 1; i <= openingStarCount; i++) {
    openingManifest.push({
        id: `openingStar${i}`,
        src: `star-${i}.png`
    });
}

const elementsManifest = [];
Object.keys(sliceConfig).forEach(key => {
    if (key.match(/^\d+$/)) {
        const config = sliceConfig[key];
        if (config.type >= 1) {
            elementsManifest.push({
                id: `i${key}-e-s`,
                src: `i${key}-e-s.png`
            });
        }

        if (config.type >= 2) {
            elementsManifest.push({
                id: `i${key}-e-w`,
                src: `i${key}-e-w.png`
            });
        }

        if (config.type >= 3) {
            elementsManifest.push({
                id: `i${key}-e-g`,
                src: `i${key}-e-g.png`
            });
        }
    }
});

export const game = [
    {
        path: `assets/${assetsPrefix}/game/`,
        manifest: [
            {id: 'star', src: 'star.jpg'},
            {id: 'helloworld', src: 'helloworld.png'},
            {id: 'cloud', src: 'cloud.png'},
            {id: 'cloud1', src: 'cloud-1.png'},
            {id: 'cloud2', src: 'cloud-2.png'},
            {id: 'cloud3', src: 'cloud-3.png'},
            {id: 'cloud4', src: 'cloud-4.png'},
            {id: 'cloud5', src: 'cloud-5.png'},
            {id: 'popPanel', src: 'popPanel.png'},
            {id: 'popTip1', src: 'popTip-1.png'},
            {id: 'popTip2', src: 'popTip-2.png'},
            {id: 'popIcon', src: 'popIcon.png'},
            {id: 'popClose', src: 'popClose.png'},
            {id: 'popBtn', src: 'popBtn.png'},
            {id: 'popBg1', src: 'popBg-1.png'},
            {id: 'popBg2', src: 'popBg-2.png'},
            {id: 'popBg3', src: 'popBg-3.png'},
            {id: 'tip', src: 'tip.png'},  
            {id: 'tipBg1', src: 'tipBg-1.png'},
            {id: 'tipBg2', src: 'tipBg-2.png'},
            {id: 'coin1', src: 'coin-1.png'},
            {id: 'coin2', src: 'coin-2.png'},
            {id: 'coin3', src: 'coin-3.png'},
            {id: 'coin4', src: 'coin-4.png'},
            {id: 'coin5', src: 'coin-5.png'},
            {id: 'coin6', src: 'coin-6.png'},
            {id: 'share', src: 'share.png'},
            {id: 'music', src: 'music.png'},
        ]
    },
    {
        path: `assets/${assetsPrefix}/game/opening/`,
        manifest: openingManifest
    },
    {
        path: `assets/${assetsPrefix}/game/elements/`,
        manifest: elementsManifest
    },
    {
        path: 'assets/',
        manifest: [
            {id: 'font', src: 'font.ttf'},
            {id: 'music', src: 'bg.mp3'}
        ]
    },
    {
        path: 'dist/',
        manifest: [
            'game.js'
        ]
    }
];