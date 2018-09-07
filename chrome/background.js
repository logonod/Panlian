if (typeof browser !== 'undefined') {
  chrome = browser
}

// https://developer.chrome.com/apps/runtime#event-onMessage
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.method) {
    case 'addScript':
      chrome.tabs.executeScript(sender.tab.id, { file: request.data })
      break
    case 'getCookies':
      getCookies(request.data).then(value => sendResponse(value))
      return true
  }
})

// Promise style `chrome.cookies.get()`
const getCookie = (detail) => {
  return new Promise(function (resolve) {
    chrome.cookies.get(detail, resolve)
  })
}

const getCookies = (details) => {
  return new Promise(function (resolve) {
    const list = details.map(item => getCookie(item))
    Promise.all(list).then(function (cookies) {
      let obj = {}
      for (let item of cookies) {
        if (item !== null) {
          obj[item.name] = item.value
        }
      }
      resolve(obj)
    })
  })
}

const showNotification = (id, opt) => {
  if (!chrome.notifications) {
    return
  }
  chrome.notifications.create(id, opt, () => {})
  setTimeout(() => {
    chrome.notifications.clear(id, () => {})
  }, 5000)
}
// 软件版本更新提示
const manifest = chrome.runtime.getManifest()
const previousVersion = localStorage.getItem('version')
if (previousVersion === '' || previousVersion !== manifest.version) {
  var opt = {
    type: 'basic',
    title: '更新',
    message: '百度盘链更新到' + manifest.version + '版本啦～\n此次更新文件分享功能~',
    iconUrl: 'img/icon.jpg'
  }
  const id = new Date().getTime().toString()
  showNotification(id, opt)
  localStorage.setItem('version', manifest.version)
}
