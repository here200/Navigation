import { defineStore } from "pinia";
import { backgroundType } from "@/common/static/data/global_data";
import { kyLocalStorage } from "@/common/util/storage";

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
      kyLocalStorage.setItem('backgroundType', this.currentBackgroundType)
    },
    getCurrentBackgroundType() {
      const localSearch = kyLocalStorage.getItem('backgroundType')
      if (localSearch) {
        this.currentBackgroundType = localSearch
      } else {
        this.saveCurrentBackgroundType(backgroundType[0])
      }
    }
  }
})

export default useMainStore