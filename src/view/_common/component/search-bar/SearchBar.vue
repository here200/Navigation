<script setup>

import useHomeStore from '@/common/store/module/home'
import useMainStore from '@/common/store/module/main';
import { storeToRefs } from 'pinia';
import {searchServiceList} from '@/common/static/data/global_data'
import {throttle} from 'lodash'

const homeStore = useHomeStore()
const {isSearchServiceOpen} = storeToRefs(homeStore)

const mainStore = useMainStore()

// 点击左边的图标
function leftClick() {
  isSearchServiceOpen.value = !isSearchServiceOpen.value
}

// 选择搜索服务
function selectSearchService(item, index) {
  homeStore.saveSearchService(item)
  isSearchServiceOpen.value = false
}

// 当在输入框输入内容时（使用节流函数）
const inputEvent = throttle(homeStore.getSearchListData, 500)

// 当点击搜索图标时
function searchClick() {
  const url = homeStore.searchService.searchURL + homeStore.inputValue
  // 打开新页面
  window.open(url, '_blank')
}

// 按键点击事件
const { searchItemIndex } = storeToRefs(homeStore)

function arrowUpEvent() {
  searchItemIndex.value--

  if (searchItemIndex.value < 0) {
    searchItemIndex.value = homeStore.searchList.length - 1
  }

  keyboardCommonOperation()
}

function arrowDownEvent() {
  searchItemIndex.value++

  if (searchItemIndex.value > homeStore.searchList.length - 1) {
    searchItemIndex.value = 0
  }

  keyboardCommonOperation()
}

function keyboardCommonOperation() {
  // 把选择的SearchItem的值 设置到 homeStore.inputValue
  homeStore.inputValue = homeStore.searchList[homeStore.searchItemIndex]
}

function escapeEvent() {
  homeStore.inputValue = ''
  homeStore.searchList = []
  
  mainStore.isShowBookmark = true
}

function inputFocus() {
  if (homeStore.inputValue.length) {
    mainStore.isShowBookmark = false
  } else {
    mainStore.isShowBookmark = true
  }
}

</script>

<template>

<div class="search-bar">
  <div class="box">
    <span class="left" @click.stop="leftClick">
      <img :src="require(`@/common/static/img${homeStore.searchService.icon}`)" alt="">
    </span>
    <input type="text" 
      placeholder="请输入内容"
      autofocus 
      v-model="homeStore.inputValue" 
      @click.stop=""
      @keyup.escape="escapeEvent"
      @keyup.enter="searchClick"
      @keydown.arrow-up="arrowUpEvent"
      @keydown.arrow-down="arrowDownEvent"
      @input.focus="inputFocus"
      @focus="inputFocus"
      @input="inputEvent">
    <span class="right" @click="searchClick">
      <img src="@/common/static/img/search/search_icon.png" alt="">
    </span>
  </div>
  <div class="search-service" :style="{display: isSearchServiceOpen ? 'block' : 'none'}">
    <template v-for="(item, index) in searchServiceList" :key="item.name">
      <div class="item" @click="selectSearchService(item, index)">{{ item.name }}</div>
    </template>
  </div>
</div>

</template>

<style lang="less" scoped>

.search-bar {
  position: relative;
}

// search
.box {
  display: flex;
  align-items: center;
  width: 896px;
  height: 43px;
  border: 1px solid #000;
  border-radius: 15px;

  input {
    flex-grow: 1;
    // width: 797px;
    height: 32px;
    padding: 5px 10px;
    font-size: 24px;
  }

  .left, .right {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 30px;
  }

  .right img, .left img {
    width: 28px;
    height: 28px;
  }
}

// search-service
.search-service {
  display: none;
  position: absolute;
  left: 0;
  top: 43px;

  background-color: #f2f2f2;
  border-radius: 5px;

  .item {
    width: 90px;
    height: 24px;
    padding: 8px;

    line-height: 24px;
    font-size: 14px;
    cursor: pointer;
    user-select: none;
  
    &:hover {
      border-radius: 12px;
      background-color: #ddd;
    }
  }
}

</style>