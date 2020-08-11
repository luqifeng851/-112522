<template>
  <div class="detail">
    <div class="top">
      <span @click="back">back</span>
      <span class="title">{{data.singer_name}}</span>
    </div>
    <!-- 头像 -->
    <div class="bgcImg" ref="img" :style="{'background-image':`url(${bgcImg})`}">
      <!-- <h2>随机播放</h2> -->
      <div class="shadow"></div>
    </div>
    <!-- 歌曲列表 -->
    <div class="sings" ref="wrapper">
      <div class="content">
        <ul class="list">
          <li v-for="(item,index) in data.list" :key="index" @click="goPlayer(index)">
            <div class="name">{{item.musicData.songname}}</div>
            <div class="desc">{{item.musicData.singer[0].name}}*{{item.musicData.albumname}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { getSingersDetail } from "../../api/api";
import { mapMutations } from "vuex";
import BS from "better-scroll";
export default {
  data() {
    return {
      data: "",
      bgcImg: ""
    };
  },
  methods: {
    ...mapMutations(["addsongList", "changeFullScreen", "changeSongIndex"]),
    back() {
      this.$router.go(-1);
    },
    goPlayer(index) {
      let detailsData = this.handerData(this.data.list);
      console.log(detailsData);
      this.addsongList(detailsData);
      this.changeFullScreen(true);
      this.changeSongIndex(index);
    },
    //处理数据
    handerData(data) {
      let result = data.map((ele, index) => {
        let { albummid, albumname, singer, songname, songmid } = ele.musicData;
        let albumidUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`;
        let audioUrl = [
          "http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400003mBrF72dILfK.m4a?guid=9283450296&vkey=919EDF1F67D0FD1094E1476FB1506909B29D1DA02801BC4658E91108B2522BD04BA1202D4005E473FF283ADF4DC57509A24F6FEB0EEDA670&uin=0&fromtag=38",
          "http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400003jqNTL41sDBf.m4a?guid=7496077206&vkey=321E0048968ED330A34506BE44E73BE9EA9031DBFBBF5A2CCB45AE50614A0B939B2202F6D053131D3CC58B3D4E378E2DA08242750B564A44&uin=0&fromtag=38",
          "http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400003mnJKy2nziE8.m4a?guid=7496077206&vkey=ACB7237EFCF9419C03A2D0BB689AAAD15A49F4B34638645990E87654925E81B1EF44F250F6EB3AFADDB435CBA2BE4F06ABEDC773DBC02120&uin=0&fromtag=38"
        ];
        return {
          albumidUrl,
          albummid,
          albumname,
          singer,
          songname,
          songmid,
          audioUrl
        };
      });
      return result;
    },
    initBS() {
      let wrapper = this.$refs.wrapper;
      let img = this.$refs.img;
      let imgH = img.clientHeight;
      this.Bs = new BS(wrapper, { probeType: 3, click: true });
      this.Bs.on("scroll", pos => {
        // console.log(pos.y);
        let { y } = pos;
        if (y > 0) {
          //背景图缩放
          let proportion = 1 + y / imgH;
          img.style.transform = `scale(${proportion})`;
          img.style.zIndex = 3;
        } else {
          if (y * -1 >= 220) {
            console.log("到顶部了");
            img.style.zIndex = 3;
            img.style.height = "40px";
            img.style.paddingTop = "0%";
          } else {
            img.style.zIndex = -1;
            img.style.height = "0";
            img.style.paddingTop = "70%";
          }
        }
      });
    }
  },
  created() {
    let { singermid } = this.$route.params;
    console.log(singermid);
    this.bgcImg = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${singermid}.jpg?max_age=2592000`;
    getSingersDetail(singermid).then(res => {
      this.data = res.data;
      console.log(this.data);
      this.$nextTick(() => {
        this.initBS();
      });
    });
  },
  beforeRouteEnter(from, to, next) {
    // 组件进入之前
    next();
  },
  async beforeRouteUpdate(to, from, next) {
    console.log("组件复用更新的时候执行", from, to);
    let { singermid } = to.params;
    console.log(singermid);
    next();
  }
};
</script>
<style lang="less" scoped>
@import "../../style/index.less";
.detail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: @black2;
  .top {
    position: absolute;
    top: 0;
    left: 0;
    .w(375);
    height: 42px;
    line-height: 42px;
    font-size: @fs-l;
    z-index: 5;
    color: #fff;
    .title {
      text-align: center;
      margin-left: 35%;
    }
  }
  .bgcImg {
    .w(375);
    padding-top: 70%;
    background-size: cover;
    position: absolute;
    top: 0px;
    z-index: -1;
    .shadow {
      position: absolute;
      top: 0;
      background: rgba(7, 17, 27, 0.3);
      width: 100%;
      height: 100%;
    }
  }
  .sings {
    position: fixed;
    top: 262px;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: @black2;
    z-index: 1;
    // overflow: hidden;
    .content {
      padding: 20px 30px;
      background-color: #222;

      li {
        height: 64px;
        //   padding: 10px 0;
        div {
          height: 20px;
          font-size: @fs-s;
          margin-top: 5px;
          color: rgba(255, 255, 255, 0.3);
        }
        .name {
          color: #fff;
        }
      }
    }
  }
}
</style>