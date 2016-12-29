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

export default class Share {
    constructor(viewport) {
        this.shareEl = query(viewport, '#share');
        this.wxReady = false;
    }

    shareWx({
        title,
        desc,
        link,
        imgUrl
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

    show() {
        return new Promise((resolve, reject) => {
            const hide = e => {
                this.shareEl.removeEventListener('tap', hide);
                this.shareEl.style.display = 'none';
                resolve();
            }

            this.shareEl.addEventListener('tap', hide);
            this.shareEl.style.display = '';
        });
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
                        && (config.success === true || config.sucess === 'true')) {
                    config.data.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage'];
                    return new Promise((resolve, reject) => {
                        wx.config(config.data);
                        wx.ready(() => {
                            // alert('wx ready');
                            this.wxReady = true;
                            // resolve();
                        });
                        wx.error((e) => {
                            // alert('wx not ready');
                            // alert(JSON.stringify(e));
                            this.wxReady = false;
                            // resolve();
                        });
                        resolve();
                    });
                } else {
                    return Promise.resolve();
                }
            })
            .catch(xhr => {
                this.wvReady = true;
            });
    }
}