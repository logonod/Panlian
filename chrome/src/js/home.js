import Core from './lib/core'
import UI from './lib/ui'
import Exporter from './lib/exporter'
import Crypto from 'crypto-js/crypto-js'
import JsonUrl from 'json-url'
import 'json-url/dist/browser/json-url-msgpack'
import 'json-url/dist/browser/json-url-lzw'
import 'json-url/dist/browser/json-url-lzma'
import 'json-url/dist/browser/json-url-lzstring'
import 'json-url/dist/browser/json-url-safe64'
import Importer from './lib/importer'

class Home extends Exporter {
  constructor () {
    const search = {
      dir: '',
      channel: 'chunlei',
      clienttype: 0,
      web: 1
    }
    const listParameter = {
      search,
      url: `/api/list?`,
      options: {
        credentials: 'include',
        method: 'GET'
      }
    }
    super(listParameter)
    this.importer = new Importer()
    this.importer.reset()
    UI.init()
    UI.addMenu(document.querySelectorAll('.g-dropdown-button')[3], 'afterend')
  }

  startListen () {
    window.addEventListener('message', (event) => {
      if (event.source !== window) {
        return
      }

      if (event.data.type && event.data.type === 'selected') {
        this.reset()
        const selectedFile = event.data.data
        if (selectedFile.length === 0) {
          Core.showToast('请选择一下你要分享的文件哦', 'failure')
          return
        }
        selectedFile.forEach((item) => {
          if (item.isdir) {
            this.addFolder(item.path)
          } else {
            this.addFile(item)
          }
        })
        this.start(300, (fileDownloadInfo) => {
          Core.showToast('正在生成盘链...', 'success', false)
          const codec = JsonUrl('lzw')
          codec.compress(fileDownloadInfo).then((link) => {
            Core.exportLinkView(link)
            Core.showToast('生成外链成功', 'success')
          })
          document.querySelector('#textExportMenu').classList.add('open-o')
        })
      }
    })
    const menuButton = document.querySelector('#panlianControl')
    menuButton.addEventListener('click', (event) => {
      if (event.target.id === 'localExport') {

      }
      if (event.target.id === 'cloudExport') {
        this.getSelected()
      }
    })
    const textImportMenu = document.querySelector('#textImportMenu')
    const importShareLink = textImportMenu.querySelector('#importShareLink')
    importShareLink.addEventListener('click', () => {
      const textImportMenu = document.querySelector('#textImportMenu')
      const shareLink = textImportMenu.querySelector('#panLinkTxt').value
      const codec = JsonUrl('lzw')
      codec.decompress(shareLink.trim().slice(6)).then(json => {
        window.postMessage({ type: 'importFiles', data: Core.parseImportFiles(this.getCurrentDir(), json) }, location.origin)
      })
    })
  }

  getSelected () {
    window.postMessage({ type: 'getSelected' }, location.origin)
  }
  getCurrentDir () {
    let dir = Core.getHashParameter('/all?path') || Core.getHashParameter('path')
    if (dir[dir.length - 1] !== '/') {
      dir += '/'
    }
    return dir
  }
  getPrefixLength () {
    const path = Core.getHashParameter('/all?path') || Core.getHashParameter('path')
    const fold = 0
    if (fold === -1 || path === '/') {
      return 1
    } else if (Core.getHashParameter('/search?key')) {
      return 1
    } else {
      const dir = path.split('/')
      let count = 0
      for (let i = 0; i < dir.length - fold; i++) {
        count = count + dir[i].length + 1
      }
      return count
    }
  }
  getFiles (files) {
    const that = this
    const prefix = this.getPrefixLength()
    const md5 = Crypto.algo.MD5.create()

    let promise = Promise.resolve()
    let completedCount = 0
    const totalCount = Object.keys(files).length

    const getOneFile = function (key) {
      return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest()
        xhr.responseType = 'blob'
        xhr.withCredentials = true
        const fileReader = new FileReader()
        const url = `${location.protocol}//pcs.baidu.com/rest/2.0/pcs/file?method=download&app_id=250528&path=${encodeURIComponent(files[key].path)}`
        xhr.open('GET', url, true)
        xhr.setRequestHeader('Range', 'bytes=0-262143')
        completedCount++
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            const contentMD5 = xhr.getResponseHeader('Content-MD5')
            fileReader.onload = function (evt) {
              Core.showToast(`正在生成文件外链... ${completedCount}/${totalCount}`, 'success', false)
              const result = evt.target.result
              md5.update(Crypto.enc.Latin1.parse(result))
              const hash = md5.finalize()
              const hashHex = hash.toString(Crypto.enc.Hex)
              that.fileDownloadInfo.push({
                'path': files[key].path.substr(prefix),
                'content-length': files[key].size,
                'content-md5': contentMD5 || files[key].md5,
                'slice-md5': hashHex
              })
              resolve()
            }
            fileReader.readAsBinaryString(xhr.response)
          } else if (xhr.readyState === 3) {
            Core.showToast(`正在生成文件外链... ${completedCount}/${totalCount}`, 'success', false)
          }
        }
        xhr.send()
      })
    }

    for (let key in files) {
      promise = promise.then(() => { return getOneFile(key) })
    }

    return promise
  }
}

const home = new Home()

home.startListen()
