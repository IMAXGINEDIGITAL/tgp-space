import {os} from 'amfe-env';
import sliceConfig from './sliceConfig';

const assetsPrefix = os.isIOS ? '2x' : '1x';

export const preload = {
    path: `assets/${assetsPrefix}/preload/`,
    manifest: [
        {id: 'bg', src: 'bg.jpg'},
        {id: 'light', src: 'light.jpg'},
        {id: 'logo', src: 'logo.jpg'}
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
                id: `i${key}-e-t`,
                src: `i${key}-e-t.png`
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
            {id: 'popPanel', src: 'popPanel.png'},
            {id: 'popTip1', src: 'popTip-1.png'},
            {id: 'popTip2', src: 'popTip-2.png'},
            {id: 'popIcon', src: 'popIcon.png'},
            {id: 'popClose', src: 'popClose.png'},
            {id: 'popBtn', src: 'popBtn.png'},
            {id: 'popBg1', src: 'popBg-1.png'},
            {id: 'popBg2', src: 'popBg-2.png'},
            {id: 'tipBg1', src: 'tipBg-1.png'},
            {id: 'tipBg2', src: 'tipBg-2.png'},
            {id: 'tipBg3', src: 'tipBg-3.png'}
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
            'font.ttf'
        ]
    },
    {
        path: 'dist/',
        manifest: [
            'game.js'
        ]
    }
];