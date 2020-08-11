<template>
  <div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in banners" :key="index">
          <img :src="item.picUrl" alt />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  props: {
    banners: {
      type: Array,
      default: []
    }
  },
  methods: {
    initBanner() {
      var mySwiper = new Swiper(".swiper-container", {
        loop: true // 循环模式选项
        // 如果需要前进后退按钮
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev"
        // }
      });
    }
  },
  watch: {
    banners() {
      this.$nextTick(() => {
        this.initBanner();
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../style/index.less";
@import "~swiper/css/swiper.min.css";
.swiper-container {
  .w(375);
  .h(150);
  // background: green;
  color: red;
  img {
    .w(375);
    .h(150);
  }
}
</style>