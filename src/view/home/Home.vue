<script setup>

import SearchBar from '../_common/component/search-bar/SearchBar.vue';
import useHomeStore from '@/common/store/module/home';
import { formatTime } from '@/common/util/time';
import { computed } from 'vue';
import useMainStore from '@/common/store/module/main';
import { storeToRefs } from 'pinia';

const mainStore = useMainStore()
const { currentTime } = storeToRefs(mainStore)
const timeStr = computed(() => formatTime(currentTime.value, 'HH:mm:ss'))

const homeStore = useHomeStore()
// 从 localhost 获取搜索服务
homeStore.getSearchService()

// 当点击搜索出来的结果的列表时
function itemClick($event) {
  homeStore.inputValue = $event.target.textContent
  
  const url = homeStore.searchService.searchURL + homeStore.inputValue
  window.open(url, '__blank')

  mainStore.isShowBookmark = true
}

// 鼠标移动事件
const {searchItemIndex} = storeToRefs(homeStore) 
function mouseenterEvent(index) {
  searchItemIndex.value = index
}

</script>

<template>

<div class="home">
  <div class="box container">
    <!-- 显示时间 -->
    <div class="time">{{ timeStr }}</div>

    <!-- 显示搜索框 -->
    <search-bar></search-bar>

    <!-- 显示搜索结果 -->
    <div class="search-result" v-show="!mainStore.isShowBookmark">
      <ul class="list">
        <template v-for="(item, index) in homeStore.searchList">
          <li @click.stop="itemClick" 
            :class="{active: searchItemIndex === index}"
            @mouseenter="mouseenterEvent(index)">{{ item }}</li>
        </template>
      </ul>
    </div>
  </div>
</div>

</template>

<style lang="less" scoped>

.home {
  display: flex;
  flex-direction: column;
  align-items: center;

  .box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    padding: 15px;

    .time {
      width: 264px;
      height: 60px;

      font-size: 45px;
      text-align: center;
    }
  }
}

// result_list
.search-result {
  margin-top: 10px;
  align-self: flex-start;
  width: 100%;

  .list {
    li {
      padding: 8px 0;
      padding-left: 31px;
      cursor: pointer;

      &.active {
        border-radius: 15px;
        background-color: #ddd;
      }
    }
  } 
}

</style>