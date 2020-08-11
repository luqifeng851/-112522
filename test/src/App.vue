<template>
  <div id="app">
    <div id="nav">
      <Header></Header>
      <Tab></Tab>
      <!-- <keep-alive include="a,b"> -->
      <router-view></router-view>
      <!-- </keep-alive> -->
      <!-- 播放器组件 -->
      <Player></Player>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import Tab from "./components/Tab";
import Player from "./components/Player";
export default {
  components: {
    Header,
    Tab,
    Player
  }
};
</script>
<style lang="less" scoped>
@import "./style/index.less";
#app {
  background-color: @black2;
  .w(375);
  height: 100vh;
}
</style>
