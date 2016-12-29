import './share.css';
import xhr from 'xhr';
import {
    win,
    doc,
    Promise,
    query,
    queryAll,
    getRect,
    getDistance,
    raf,
    delay
} from './util';

export default class Share {
    constructor(viewport) {
        this.shareEl = query(viewport, '#share');
        this.wxReady = false;
    }

    show({
        title,
        desc,
        link,
        imgUrl
    }) {
        return new Promise((resolve, reject) => {
            if (!this.wxReady) {
                const hide = e => {
                    this.shareEl.removeEventListener('tap', hide);
                    this.shareEl.style.display = 'none';
                    resolve();
                }

                this.shareEl.addEventListener('tap', hide);
                this.shareEl.style.display = '';
            } else {
                wx.onMenuShareTimeline({
                    title,
                    link,
                    imgUrl,
                    success: resolve,
                    cancel: resolve
                });

                wx.onMenuShareAppMessage({
                    title, // 分享标题
                    desc, // 分享描述
                    link, // 分享链接
                    imgUrl, // 分享图标
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    success: resolve,
                    cancel: resolve
                });
            }
        });
    }

    ready() {
        return new Promise((resolve, reject) => {
            const url = 'wx.php';
            // const url = 'http://mp.imaxgine.com/tgp/space/wx.php';            
            xhr.get(`${url}?method=calculate`, (err, resp) => {
                if (err) {
                    resolve();
                    return;
                }

                let config;
                try {
                    config = JSON.parse(resp.body);
                } catch(e) {}

                if (config
                        && (config.success === true || config.sucess === 'true')) {
                    config.data.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage'];
                    wx.config(config.data);
                    wx.ready(() => {
                        this.wxReady = true;
                        resolve();
                    });
                } else {
                    resolve();
                }
            });
        });
    }
}