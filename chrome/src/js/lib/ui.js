import Core from './core'

class UI {
  constructor () {
    this.version = '0.0.1'
    this.updateDate = '2018/9/4'
  }
  init () {
    this.addTextExport()
    this.addTextImport()
  }
  // z-index resolve share page show problem
  addMenu (element, position) {
    const menu = `
      <div id="panlianMenu" class="g-dropdown-button">
        <a class="g-button">
          <span class="g-button-right">
            <em class="icon icon-share-link"></em>
            <span class="text">百度盘链</span>
          </span>
        </a>
        <div id="panlianControl" class="menu" style="z-index:50;">
          <a class="g-button-menu" id="cloudExport" href="javascript:void(0);">盘链分享</a>
          <a class="g-button-menu" id="importButton" href="javascript:void(0);">文件导入</a>
        </div>
      </div>`
    element.insertAdjacentHTML(position, menu)
    const panlianMenu = document.querySelector('#panlianMenu')
    panlianMenu.addEventListener('mouseenter', () => {
      panlianMenu.classList.add('button-open')
    })
    panlianMenu.addEventListener('mouseleave', () => {
      panlianMenu.classList.remove('button-open')
    })
    const importButton = document.querySelector('#importButton')
    const textImportMenu = document.querySelector('#textImportMenu')
    importButton.addEventListener('click', () => {
      textImportMenu.classList.add('open-o')
    })
  }
  addTextExport () {
    const text = `
      <div id="textExportMenu" class="modal export-menu">
        <div class="modal-inner">
          <div class="modal-header">
            <div class="modal-title">盘链导出</div>
            <div class="modal-close">×</div>
          </div>
          <div class="modal-body">
            <div class="export-menu-row">
              <a class="export-menu-button" href="javascript:void(0);" id="copyDownloadLinkTxt">拷贝链接</a>
            </div>
            <div class="export-menu-row">
              <textarea class="export-menu-textarea" type="textarea" spellcheck="false" id="panLinkTxt"></textarea>
            </div>
          </div>
        </div>
      </div>`
    document.body.insertAdjacentHTML('beforeend', text)
    const textExportMenu = document.querySelector('#textExportMenu')
    const close = textExportMenu.querySelector('.modal-close')
    const copyDownloadLinkTxt = textExportMenu.querySelector('#copyDownloadLinkTxt')
    copyDownloadLinkTxt.addEventListener('click', () => {
      Core.copyText(copyDownloadLinkTxt.dataset.link)
    })
    close.addEventListener('click', () => {
      textExportMenu.classList.remove('open-o')
      this.resetTextExport()
    })
  }
  addTextImport () {
    const text = `
      <div id="textImportMenu" class="modal export-menu">
        <div class="modal-inner">
          <div class="modal-header">
            <div class="modal-title">盘链导入</div>
            <div class="modal-close">×</div>
          </div>
          <div class="modal-body">
            <div class="export-menu-row">
              <a class="export-menu-button" href="javascript:void(0);" id="importShareLink">导入盘链文件</a>
            </div>
            <div class="export-menu-row">
              <textarea class="export-menu-textarea" type="textarea" spellcheck="false" id="panLinkTxt"></textarea>
            </div>
          </div>
        </div>
      </div>`
    document.body.insertAdjacentHTML('beforeend', text)
    const textImportMenu = document.querySelector('#textImportMenu')
    const close = textImportMenu.querySelector('.modal-close')
    close.addEventListener('click', () => {
      textImportMenu.classList.remove('open-o')
      this.resetTextImport()
    })
  }
  resetTextExport () {
    const textExportMenu = document.querySelector('#textExportMenu')
    textExportMenu.querySelector('#panLinkTxt').value = ''
    textExportMenu.querySelector('#copyDownloadLinkTxt').dataset.link = ''
  }
  resetTextImport () {
    const textImportMenu = document.querySelector('#textImportMenu')
    textImportMenu.querySelector('#panLinkTxt').value = ''
  }
}

export default new UI()
