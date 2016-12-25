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
            {id: 'tipText', src: 'tipText.png'}, 
            {id: 'tipBg1', src: 'tipBg-1.png'},
            {id: 'tipBg2', src: 'tipBg-2.png'},
            {id: 'coin1', src: 'coin-1.png'},
            {id: 'coin2', src: 'coin-2.png'},
            {id: 'coin3', src: 'coin-3.png'},
            {id: 'coin4', src: 'coin-4.png'},
            {id: 'coin5', src: 'coin-5.png'},
            {id: 'coin6', src: 'coin-6.png'},
            {id: 'arrow-left', src: 'arrow-left.png'},
            {id: 'arrow-right', src: 'arrow-right.png'},
            {id: 'share', src: 'share.png'}
        ]
    },
    {
        path: `assets/${assetsPrefix}/game/elements/`,
        manifest: elementsManifest
    },
    {
        path: 'assets/',
        manifest: [
            {id: 'font', src: 'font.ttf'},
            {id: 'music', src: os.isIOS ? 'bg.mp3' : 'bg.ogg'}
        ]
    },
    {
        path: 'dist/',
        manifest: [
            'game.js'
        ]
    }
];