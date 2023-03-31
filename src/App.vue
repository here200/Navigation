<script setup>

import Home from './view/home/Home.vue';
import Bookmark from './view/bookmark/Bookmark.vue';
import Weather from './view/weather/Weather.vue';
import useMainStore from './common/store/module/main';
import useHomeStore from './common/store/module/home';
import { backgroundType } from './common/static/data/global_data'; 
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const mainStore = useMainStore()
mainStore.startTime()
mainStore.getCurrentBackgroundType()

const homeStore = useHomeStore()
const closeSearchServiceSelection = () => {
  if (homeStore.isSearchServiceOpen) {
    homeStore.isSearchServiceOpen = false
  }
  if (!mainStore.isShowBookmark) {
    mainStore.isShowBookmark = true
  }
}

// 背景类型
const {currentBackgroundType} = storeToRefs(mainStore)
const coverStyle = computed(() => ({
  background: `url(${currentBackgroundType.value?.url}) ${currentBackgroundType.value?.set}`
}))

const switchBackgroundType = () => {
  let currentIndex = backgroundType.findIndex(item => item.name === currentBackgroundType.value.name)
  currentIndex++
  if (currentIndex >= backgroundType.length) currentIndex = 0
  mainStore.saveCurrentBackgroundType(backgroundType[currentIndex])
}

</script>

<template>

<div class="app" @click="closeSearchServiceSelection">
  <!-- home -->
  <home class="home"></home>
  <!-- bookmark -->
  <bookmark v-show="mainStore.isShowBookmark"></bookmark>
  <!-- background-cover -->
  <div class="cover" :style="coverStyle"></div>
  <!-- setting -->
  <div class="setting" @click="switchBackgroundType">
    <span>{{ currentBackgroundType.name }}</span>
    <img src="@/common/static/img/setting/setting.png" alt="">
  </div>
  <!-- weather -->
  <weather class="weather"></weather>
</div>

</template>

<style lang="less" scoped>

.home {
  margin-top: 90px;
}

.cover {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -10;
}

.setting {
  position: fixed;
  right: 0;
  top: 0;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 28px;
    height: 28px;
  }
}

.weather {
  position: fixed;
  top: 0;
  left: 0;
}

</style>