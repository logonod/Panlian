class Core {
  constructor () {
    this.cookies = {}
  }
  objectToQueryString (obj) {
    return Object.keys(obj).map((key) => {
      return `${key}=${obj[key]}`
    }).join('&')
  }
  objectToUrlEncode (obj) {
    return Object.keys(obj).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
    }).join('&');
  }
  sendToBackground (method, data, callback) {
    chrome.runtime.sendMessage({
      method,
      data
    }, callback)
  }
  showToast (message, type, autoClose) {
    window.postMessage({ type: 'showToast', data: { message, type, autoClose } }, location.origin)
  }
  refreshList () {
    window.postMessage({ type: 'refreshList'}, location.origin)
  }
  getHashParameter (name) {
    const hash = window.location.hash
    const paramsString = hash.substr(1)
    const searchParams = new URLSearchParams(paramsString)
    return searchParams.get(name)
  }
  parseImportFiles (dir, json) {
    json.forEach((element) => {
      element['path'] = dir + element['path']
      element['local_mtime'] = String(Math.floor(new Date().getTime()/1000))
    })
    return json
  }
  copyText (text) {
    const input = document.createElement('textarea')
    document.body.appendChild(input)
    input.value = text
    input.focus()
    input.select()
    const result = document.execCommand('copy')
    input.remove()
    if (result) {
      this.showToast('拷贝成功~', 'success')
    } else {
      this.showToast('拷贝失败 QAQ', 'failure')
    }
  }
  exportLinkView (link) {
    const linkText = `pan://${link}`
    document.querySelector('#panLinkTxt').value = linkText
    document.querySelector('#copyDownloadLinkTxt').dataset.link = linkText
  }
}

export default new Core()
