<template>
  <div class="search">
    <div class="search-box">
      <!-- <img src="/favicon.ico" alt @click="add()" /> -->
      <button @click="add(songValue)">搜索</button>
      <input type="text" placeholder="搜索歌手，歌曲" class="box" v-model="songValue" />
    </div>
    <!-- 可以滚动区域 -->
    <div class="wrapper">
      <div class="content">
        <div class="hotSearch">
          <p>热门搜索</p>
          <ul class="list">
            <li v-for="(item,index) in songsList" :key="index">
              <span>{{item.k}}</span>
            </li>
          </ul>
        </div>
        <div class="searchHistory">
          <div class="title">
            <span>搜索历史</span>
            <span class="right">del</span>
          </div>
          <ul class="list">
            <li v-for="(item,index) in searchList" :key="index">
              <span>{{item}}</span>
              <span class="right">X</span>
            </li>
          </ul>
          <!-- <div style="height:1000px;background:#852">测试</div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import { getHotSearchData } from "../../api/api";
export default {
  data() {
    return {
      songsList: [],
      searchList: ["甜蜜蜜"],
      songValue: ""
    };
  },
  methods: {
    add(value) {
      this.searchList.push(value);
      this.songValue = "";
      this.initBS();
    },
    initBS() {
      const wrapper = document.querySelector(".wrapper");
      const scroll = new BScroll(wrapper);
    }
  },
  created() {
    getHotSearchData().then(res => {
      console.log(res.data.hotkey);
      this.songsList = res.data.hotkey;
      this.$nextTick(() => {
        this.initBS();
      });
    });
  }
};
</script>
<style lang="less" scoped>
@import "../../style/index.less";
.search {
  .w(375);
  .search-box {
    margin: 20px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    height: 40px;
    display: flex;
    line-height: 40px;
    justify-content: center;
    align-items: center;
    img {
      width: 24px;
      height: 24px;
      line-height: 40px;
    }
    input {
      width: 289px;
      background-color: rgba(255, 255, 255, 0.1);
      height: 20px;
      border-color: rgba(255, 255, 255, 0.1);
      color: #fff;
      font-size: @fs-s;
      -webkit-box-flex: 1;
    }
  }
  .wrapper {
    position: fixed;
    top: 168px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    .content {
      .w(375);
      .hotSearch {
        .w(375);
        height: 168px;
        margin: 0 20px 20px;
        font-size: @fs-s;
        color: rgba(255, 255, 255, 0.5);
        overflow: hidden;
        p {
          height: 18px;
          margin: 0 0 20px;
        }
        .list {
          li {
            height: 23.6px;
            margin: 0 23px 10px 0;
            padding: 5px 10px;
            float: left;
            border-radius: 5px;
            background-color: rgba(255, 255, 255, 0.1);
            line-height: 23.6px;
          }
        }
      }
      .searchHistory {
        margin: 40px 20px 0 20px;
        font-size: @fs-s;
        color: rgba(255, 255, 255, 0.5);
        .list {
          li {
            height: 40px;
            line-height: 40px;
            font-size: @fs-m;
          }
        }
      }
    }
  }
  .right {
    float: right;
  }
}
</style>