import { defineStore } from "pinia";

import { backgroundType } from "@/common/static/data/global_data";

const useMainStore = defineStore('main', {
  state: () => ({
    // 时间相关的
    currentTime: new Date(),
    timer: null,
    timeHandler: null,
    // 是否显示书签
    isShowBookmark: true,
    // 当前的背景
    currentBackgroundType: {}
  }),
  actions: {
    startTime() {
      if (this.timeHandler === null) {
        this.timeHandler = () => {
          this.currentTime = new Date()
        }
      }

      if (this.timer === null) {
        this.timer = setInterval(this.timeHandler, 500)
      }
    },
    stopTime() {
      if (this.timer !== null) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    saveCurrentBackgroundType(newBackgroundType) {
      this.currentBackgroundType = newBackgroundType
      // 同时保存到 localStroage
      localStorage.setItem('backgroundType', JSON.stringify(this.currentBackgroundType))
    },
    getCurrentBackgroundType() {
      backgroundType[0].url = require('@/common/static/img/background/wendi.png')
      backgroundType[0].set = 'center/cover no-repeat #777'

      const localSearch = localStorage.getItem('backgroundType')
      if (localSearch) {
        this.currentBackgroundType = JSON.parse(localSearch)
      } else {
        this.saveCurrentBackgroundType(backgroundType[0])
      }
    }
  }
})

export default useMainStore