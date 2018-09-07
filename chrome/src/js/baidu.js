class Baidu {
  constructor () {
    this.context = window.require('system-core:context/context.js').instanceForSystem
    this.context.log.send = function () {}
    this.dialog = window.require('disk-system:widget/plugin/uploader/dialog/dialog.js').get()
  }
  // 封装的百度的Toast提示消息
  // Type类型有
  // caution       警告  failure       失败  loading      加载 success      成功
  showToast ({message, type, autoClose = true}) {
    this.context.ui.tip({
      mode: type,
      msg: message,
      autoClose: autoClose
    })
  }
  getLogID () {
    /* eslint-disable */
    let s = this.context.tools.baseService
    let u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/~！@#￥%……&"
      , l = String.fromCharCode
      , d = function(e) {
        if (e.length < 2) {
            let n = e.charCodeAt(0)
            return 128 > n ? e : 2048 > n ? l(192 | n >>> 6) + l(128 | 63 & n) : l(224 | n >>> 12 & 15) + l(128 | n >>> 6 & 63) + l(128 | 63 & n)
        }
        let n = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320)
        return l(240 | n >>> 18 & 7) + l(128 | n >>> 12 & 63) + l(128 | n >>> 6 & 63) + l(128 | 63 & n)
    }
      , f = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g
      , g = function(e) {
        return (e + "" + Math.random()).replace(f, d)
    }
      , m = function(e) {
        let n = [0, 2, 1][e.length % 3]
          , t = e.charCodeAt(0) << 16 | (e.length > 1 ? e.charCodeAt(1) : 0) << 8 | (e.length > 2 ? e.charCodeAt(2) : 0)
          , o = [u.charAt(t >>> 18), u.charAt(t >>> 12 & 63), n >= 2 ? "=" : u.charAt(t >>> 6 & 63), n >= 1 ? "=" : u.charAt(63 & t)]
        return o.join("")
    }
      , p = function(e) {
        return e.replace(/[\s\S]{1,3}/g, m)
    }
      , h = function() {
        return p(g((new Date).getTime()))
    }
      , v = function(e, n) {
        return n ? h(String(e)).replace(/[+\/]/g, function(e) {
            return "+" == e ? "-" : "_"
        }).replace(/=/g, "") : h(String(e))
    }
    return v(s.getCookie("BAIDUID"))
    /* eslint-enable */
  }
  startListen () {
    window.addEventListener('message', (event) => {
      if (event.data.type && event.data.type === 'getSelected') {
        window.postMessage({ type: 'selected', data: this.context.list.getSelected() }, location.origin)
      }
      if (event.data.type && event.data.type === 'importFiles') {
        window.postMessage({ type: 'import', data: event.data.data, logid: window.logID, bdstoken: window.yunData.MYBDSTOKEN }, location.origin)
      }
      if (event.data.type && event.data.type === 'showToast') {
        this.showToast(event.data.data)
      }
      if (event.data.type && event.data.type === 'refreshList') {
        this.dialog.systemRefresh()
      }
    })
    if (window.yunData) {
      // TODO 分析效果
      if (window.yunData.sign2) {
        const yunData = window.require('disk-system:widget/data/yunData.js').get()
        window.postMessage({ type: 'yunData', data: yunData }, location.origin)
      } else {
        window.postMessage({ type: 'yunData', data: JSON.parse(JSON.stringify(window.yunData)) }, location.origin)
      }
    }
    if (!window.logID) {
      window.logID = this.getLogID()
    }
  }
}

const baidu = new Baidu()

baidu.startListen()
