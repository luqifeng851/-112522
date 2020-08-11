<template>
  <div class="rank">
    <div class="wrapper" ref="xixi">
      <ul class="content">
        <li v-for="(item,index) in list" :key="index">
          <div class="left">
            <img :src="item.picUrl" alt />
          </div>
          <div class="right">
            <p
              v-for="(item1,index1) in item.songList"
              :key="index1"
            >{{index1+1}}{{item1.songname}}-{{item1.singername}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import BS from "better-scroll";
import jsonp from "jsonp";
import { getRankData } from "../../api/api";
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    initBS() {
      const wrapper = document.querySelector(".wrapper");
      const scroll = new BS(this.$refs["xixi"]);
    }
  },
  created() {
    getRankData().then(res => {
      this.list = res.data.topList;
    });
  },
  mounted() {
    this.initBS();
  }
};
</script>
<style lang="less" scoped>
@import "../../style/index.less";
.rank {
  .wrapper {
    position: fixed;
    top: 88px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    .content {
      .w(375);
      li {
        .w(375);
        height: 120px;
        margin: 0 20px;
        padding-top: 20px;
        display: flex;
        box-sizing: border-box;

        .left {
          width: 100px;
          height: 100px;
          img {
            width: 100px;
            height: 100px;
          }
        }
        .right {
          width: 235px;
          height: 100px;
          color: #fff;
          background: #333;
          padding: 0 20px;
          box-sizing: border-box;
          p {
            overflow: hidden;
            height: 26px;
            line-height: 38px;
            font-size: @fs-xs;
            color: rgba(255, 255, 255, 0.5);
          }
        }
      }
    }
  }
}
</style>