import Core from './core'

class Importer {
  constructor () {
    const search = {
      channel: 'chunlei',
      clienttype: 0,
      web: 1,
      rtype: 1,
      app_id: 250528,
      bdstoken: '',
      logid: ''
    }
    const uploadParameter = {
      search,
      url: `/api/rapidupload?`,
      options: {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: {}
      }
    }
    this.uploadParameter = uploadParameter
    this.fileDownloadInfo = []
    this.currentTaskId = 0
    this.completedCount = 0
    this.errorCount = 0
    this.files = []
    window.addEventListener('message', (event) => {
      if (event.source !== window) {
        return
      }

      if (event.data.type && event.data.type === 'import') {
        this.reset()
        const files = event.data.data
        if (files.length === 0) {
          Core.showToast('一个文件都没有哦...', 'caution')
          return
        }
        this.files = files
        this.uploadParameter.search.bdstoken = event.data.bdstoken
        this.uploadParameter.search.logid = event.data.logid
        this.start(300, () => {
          const textImportMenu = document.querySelector('#textImportMenu')
          textImportMenu.classList.remove('open-o')
          textImportMenu.querySelector('#panLinkTxt').value = ''
          Core.refreshList()
          if (this.errorCount > 0) {
            Core.showToast(`${this.errorCount}/${this.completedCount}个文件导入失败`, 'caution')
          } else {
            Core.showToast('导入文件完成', 'success')
          }
          this.reset()
        })
      }
    })
  }
  start (interval = 300, done) {
    this.interval = interval
    this.done = done
    this.currentTaskId = new Date().getTime()
    this.getNextFile(this.currentTaskId)
  }
  reset () {
    this.fileDownloadInfo = []
    this.currentTaskId = 0
    this.files = {}
    this.completedCount = 0
    this.errorCount = 0
  }
  getNextFile (taskId) {
    if (taskId !== this.currentTaskId) {
      return
    }
    if (this.files.length !== 0) {
      this.completedCount++
      Core.showToast(`正在导入文件... ${this.completedCount}/${this.completedCount + this.files.length - 1}`, 'success')
      const file = this.files.pop()
      this.uploadParameter.options.body = Core.objectToUrlEncode(file)
      fetch(`${window.location.origin}${this.uploadParameter.url}${Core.objectToQueryString(this.uploadParameter.search)}`, this.uploadParameter.options).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setTimeout(() => this.getNextFile(taskId), this.interval)
            if (data.errno !== 0) {
              this.errorCount++
              Core.showToast('未知错误', 'failure')
              console.log(data)
              return
            }
          })
        } else {
          console.log(response)
        }
      }).catch((err) => {
        this.errorCount++
        Core.showToast('网络请求失败', 'failure')
        console.log(err)
        setTimeout(() => this.getNextFile(taskId), this.interval)
      })
    } else if (this.files.length === 0) {
      this.done()
    }
  }

  getFiles (files) {
    throw new Error('subclass should implement this method!')
  }
}

export default Importer
