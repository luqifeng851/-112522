<template>
  <div class="singer">
    <div class="wrapper">
      <div class="content">
        <div class="item" v-for="(item,index) in singersList" :key="index" :ref="item.Findex">
          <h3>{{item.Findex}}</h3>
          <ul class="list">
            <li
              v-for="(item1,index1) in item.list"
              :key="index1"
              @click="goDetail(item1.Fsinger_mid)"
            >
              <img :src="item1.picUrl" alt />
              <span>{{item1.Fsinger_name}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 快速列表 -->
    <div class="listShortCut">
      <ul @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <li
          v-for="(item,index) in quickData"
          :key="index"
          :class="itemFindex==item?'current':''"
          @click="quickJump(item)"
        >{{item}}</li>
      </ul>
    </div>
    <!--嵌套路由 -->
    <transition
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutRight"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import BS from "better-scroll";
import { getSingersList } from "../../api/api";
import { dealWithData } from "./index";
export default {
  // name: "b",
  data() {
    return {
      singersList: [],
      itemFindex: "hot"
    };
  },
  methods: {
    goDetail(singerMid) {
      this.$router.push(`singer/${singerMid}`);
    },
    //手指触摸的事件
    touchStart(e) {
      let startY = e.touches[0].pageY;
      this.touch.y = startY;
      //获取按下点的下标
      this.touch.startCount = parseInt((startY - 142) / 18);
      // console.log("touchStart", this.touch.startCount);
    },
    touchMove(e) {
      let moveY = e.touches[0].pageY;
      //计算移动过的距离
      let moveDis = moveY - this.touch.y;
      //移动过的格子数
      let moveCount = parseInt(moveDis / 18);
      //移动的总的格子数
      let moveIndex = this.touch.startCount + moveCount;

      // 防止超出边界
      if (moveIndex < 0 || moveIndex > this.quickData.length - 1) {
        return false;
      }
      let moveFindex = this.quickData[moveIndex];
      this.itemFindex = this.quickData[moveIndex];
      this.quickJump(moveFindex);
    },
    touchEnd() {
      console.log("touchEnd");
    },
    quickJump(item) {
      //跳转到固定元素
      let dom = this.$refs[item][0];
      // console.log("点到我了", item, dom);
      // //  用bs 内部的方法直接跳转到固定元素
      this.BS.scrollToElement(dom);
      this.itemFindex = item;
    },
    initBS() {
      const wrapper = document.querySelector(".wrapper");
      this.BS = new BS(wrapper, { probeType: 3, click: true });
      // console.log(this.$refs);
      //获取距离数组
      let distance = [];
      for (const key in this.$refs) {
        distance.push(this.$refs[key][0].offsetTop);
      }
      // console.log(distance);
      //监听滚动
      this.BS.on("scroll", pos => {
        let y = Math.abs(pos.y);
        // console.log(y);
        let scrollIndex = 0;
        for (var i = 0; i < distance.length; i++) {
          if (y > distance[i] && y < distance[i + 1]) {
            scrollIndex = i;
          } else if (y >= distance[distance.length - 1]) {
            //  最后的边界判断
            scrollIndex = distance.length - 1;
          }
        }
        //根据下标更换字母
        this.itemFindex = this.quickData[scrollIndex];
      });
    }
  },
  created() {
    this.touch = { y: 0, startCount: 0 };
    getSingersList().then(res => {
      let result = dealWithData(res.data.list);
      // console.log(result);

      // console.log(this.quickData);
      this.singersList = result;
      this.$nextTick(() => {
        this.initBS();
      });
    });
  },
  computed: {
    quickData() {
      let result = this.singersList.map((item, index) => {
        return item.Findex;
      });
      return result;
    }
  }
};
</script>
<style lang="less">
@import "../../style/index.less";
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  left: 0;
  right: 0;
  .listShortCut {
    // z-index: 30;
    position: absolute;
    right: 3px;
    top: 40px;
    width: 20px;
    padding: 20px 0 20px;
    border-radius: 10px;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
    li {
      width: 18px;
      height: 18px;
      color: hsla(0, 0%, 100%, 0.5);
      font-size: @fs-xs;
    }
    .current {
      color: @yellow;
    }
  }
  .wrapper {
    height: 100%;
    overflow: hidden;
    .content {
      .w(375);
      .item {
        h3 {
          height: 30px;
          line-height: 30px;
          padding-left: 20px;
          font-size: 12px;
          color: hsla(0, 0%, 100%, 0.5);
          background: #333;
        }
        .list {
          li {
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding: 20px 0 0 30px;
            img {
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }
            span {
              margin-left: 20px;
              color: hsla(0, 0%, 100%, 0.5);
              font-size: @fs-s;
            }
          }
        }
      }
    }
  }
}
</style>