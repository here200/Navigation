export function jsoup(url, data) {
  // 拼接数据
  let res = ''
  if (data) {
    if (typeof data === 'string') ret = '&' + data
    if (typeof data === 'object') {
      for (const key in data) {
        res += '&' + key + '=' + encodeURIComponent(data[key])
      }
    }
  }

  // 构造script
  const scriptEl = document.createElement('script');
  scriptEl.src = `${url}?cb=window.baidu.sug${res}`

  const promise = new Promise((resolve, reject) => {
    window.baidu = {  
      sug: function(json) {
        resolve(json)
      }
    }
    document.head.appendChild(scriptEl)
    document.head.removeChild(scriptEl)
  })

  return promise
}