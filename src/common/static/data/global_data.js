const searchServiceList = [
  {
    name: '百度', 
    searchURL: 'https://www.baidu.com/s?wd=',
    icon: '/search/baidu.png'
  },
  {
    name: 'bing', 
    searchURL: 'https://cn.bing.com/search?q=',
    icon: '/search/bing.png'
  },
  {
    name: '谷歌', 
    searchURL: 'https://www.google.com/search?q=',
    icon: '/search/google.png'
  },
  {
    name: 'DuckDuckGo', 
    searchURL: 'https://duckduckgo.com/?q=',
    icon: '/search/duckduckgo.png'
  },
]

const backgroundType = [
  {name: '默认背景', url: '', set: ''},
  {
    name: "随机动漫壁纸",
    url: "https://api.paugram.com/wallpaper?source=gh",
    set: "bottom right/60% no-repeat",
  },
  {
    name: "必应每日壁纸",
    url: "https://api.paugram.com/bing",
    set: "center/cover no-repeat",
  },
  {
    name: "Unsplash 随机图片",
    url: "https://source.unsplash.com/random/1920x1080",
    set: "center/cover no-repeat",
  }
]

export {
  searchServiceList,
  backgroundType
}