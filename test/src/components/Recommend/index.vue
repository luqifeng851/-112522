<template>
  <div class="recommend">
    <!-- 滚动区域 -->
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <!-- 轮播图 -->
        <banner :banners="list"></banner>
        <div class="title">歌曲推荐列表</div>
        <ul class="list">
          <li v-for="(item ,index) in recommendList" :key="index">
            <div class="left">
              <img :src="item.imgurl" alt />
            </div>
            <div class="right">
              <p class="name">{{item.creator.name}}</p>
              <p class="album">{{item.dissname}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import banner from "../Banner";
import { Indicator } from 'mint-ui';
import BS from "better-scroll";
import { getBannerList, getRecommendList } from "../../api/api";
export default {
  // name: "a",
  components: {
    banner
  },
  data() {
    return { list: [], recommendList: [] };
  },

  methods: {
    initBS() {
      let wrapper = this.$refs.wrapper;
      this.BS = new BS(wrapper, {
        pullDownRefresh: {
          threshold: 50,
          stop: 20
        },
        pullUpLoad: {
          threshold: 50
        }
      });
      // 监听下拉刷新
      this.BS.on("pullingDown", () => {
        console.log("下拉刷新");
        // 上次下拉刷新已经结束 可以开始下一次
        Indicator.open({
          text: "加载中...",
          spinnerType: "fading-circle"
        });
        getRecommendList().then(res => {
          Indicator.close();
          this.recommendList = res.data.list;
          this.BS.finishPullDown();
        });
      });
      // 监听上拉加载
      this.BS.on("pullingUp", () => {
        console.log("上拉加载 请求下一页的数据");
        // 上一次上拉加载已经结束可以开启下一次
        this.BS.finishPullUp();
      });
    }
  },
  mounted() {
    getBannerList().then(res => {
      this.list = res.data.slider;
    });
    getRecommendList().then(res => {
      this.recommendList = res.data.list;
    });
    this.initBS();
  }
};
</script>
<style lang="less" scoped>
@import "../../style/index.less";
.recommend {
  .wrapper {
    position: fixed;
    top: 88px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    .content {
      .w(375);
      .title {
        .w(375);
        height: 65px;
        text-align: center;
        line-height: 65px;
        font-size: @fs-s;
        color: @yellow;
      }
      .list {
        li {
          .w(375);
          height: 82px;
          box-sizing: border-box;
          padding: 0px 20px 20px 20px;
          // border: 1px solid red;
          display: flex;
          .left {
            width: 82px;
            height: 60px;
            img {
              width: 60px;
              height: 60px;
            }
            // background: pink;
          }
          .right {
            color: #fff;
            font-size: @fs-s;
            .album {
              color: #ccd;
            }
            p {
              margin: 7px;
            }
          }
        }
      }
    }
  }
}
</style>