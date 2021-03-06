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

function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();

  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

function makeCorsRequest(method, url) {
  // This is a sample server that supports CORS.
  return new Promise((resolve, reject) => {
      const xhr = createCORSRequest(method, url);

      if (!xhr) {
        reject();
        return;
      }

      // Response handlers.
      xhr.onload = () => resolve(xhr)
      xhr.onerror = () => reject(xhr);
      xhr.send();
  })
}

export default class WXShare {
    constructor() {
        this.wxReady = false;
    }

    share({
        title,
        desc,
        link = 'http://mp.imaxgine.com/tgp/space/index.html',
        imgUrl = 'http://mp.imaxgine.com/tgp/space/assets/logo.jpg'
    }) {
        if (this.wxReady) {
            wx.onMenuShareTimeline({
                title,
                link,
                imgUrl,
                success: (e) => {
                    // alert('success')
                },
                cancel: (e) => {
                    // alert(JSON.stringify(e))
                }
            });

            wx.onMenuShareAppMessage({
                title, // 分享标题
                desc, // 分享描述
                link, // 分享链接
                imgUrl, // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                success: (e) => {
                    // alert('success')
                },
                cancel: (e) => {
                    // alert(JSON.stringify(e))
                }
            });
        }
    }

    ready() {
        const method = 'GET';
        const url = 'wx.php';
        // const url = 'http://120.76.215.155/tgp/space/wx.php';

        return makeCorsRequest(method, `${url}?method=calculate`)  
            .then((xhr) => {
                // debugger
                let config;
                try {
                    config = JSON.parse(xhr.responseText);
                } catch(e) {}

                if (config
                        && (config.success === true || config.success === 'true')) {
                    config.data.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage'];
                    return new Promise((resolve, reject) => {
                        wx.config(config.data);
                        wx.ready(() => {
                            this.wxReady = true;
                            resolve();

                        });
                        wx.error((e) => {
                            this.wxReady = false;
                            // resolve();
                        });
                    });
                } else {
                    return Promise.resolve();
                }
            })
            .catch(xhr => {
                this.wxReady = false;
            });
    }
}