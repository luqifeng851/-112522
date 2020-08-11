<template>
  <div class="item">
    <img src="/favicon.ico" alt />
    <span>思慧音乐播放盒</span>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
@import "../../style/index.less";
.item {
  .w(375);
  height: 44px;
  background-color: @black2;
  color: @yellow;
  font-size: @fs-l;
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  margin: 6px 9px 0 0;
  width: 30px;
  height: 32px;
}
span {
  display: inline-block;
  vertical-align: top;
  line-height: 44px;
  font-size: 18px;
}
</style>