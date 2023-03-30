import { defineStore } from "pinia";
import { searchServiceList } from "@/common/static/data/global_data";
import { getSuggestion } from "@/common/request";

const useHomeStore = defineStore('home', {
  state: () => ({
    // 搜索框相关的
    inputValue: '',
    searchService: {},
    searchList: [],
    // 搜索服务选择是否打开
    isSearchServiceOpen: false,
    // 搜索列表的索引
    searchItemIndex: 0
  }),
  actions: {
    saveSearchService(newSearchService) {
      this.searchService = newSearchService
      // 同时保存到 localStroage
      localStorage.setItem('searchService', JSON.stringify(this.searchService))
    },
    getSearchService() {
      const localSearch = localStorage.getItem('searchService')
      if (localSearch) {
        this.searchService = JSON.parse(localSearch)
      } else {
        this.saveSearchService(searchServiceList[0])
      }
    },

    async getSearchListData() {
      const res = await getSuggestion(this.inputValue)
      this.searchList = res.s
    }
  }
})

export default useHomeStore