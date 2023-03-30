<script setup>
import {bookmarkData} from '@/common/static/data/bookmark'
</script>

<template>
  
<div class="bookmark container">
  <ul class="box">
    <template v-for="item in bookmarkData">
      <li>
        <a :href="item.url" target="_blank">
          <img :src="require(`@/common/static/img${item.icon_path}`)" alt="">
          <span>{{ item.name }}</span>
        </a>
      </li>
    </template>
  </ul>
</div>

</template>

<style lang="less" scoped>

.bookmark {
  margin: 0 auto;
  padding: 15px;
  // background: transparent;

  .box {
    display: flex;
    flex-wrap: wrap;

    li {
      margin: 3px 14px;
      width: 84px;
      height: 108px;

      a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
          width: 70px;
          height: 70px;
          margin-bottom: 4px;
        }

        span {
          font-size: 14px;
        }
      }
    }
  }
}

</style>