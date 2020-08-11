<template>
  <div class="player" v-if="songList.length">
    <div class="big" v-if="fullScreen">
      <div class="top">
        <div class="back" @click="goSmall">V</div>
        <div class="singName">{{currentSong.songname}}</div>
        <div class="subtitle">{{currentSong.singer[0].name}}</div>
      </div>
      <!-- 背景 -->
      <div class="bg">
        <img :src="currentSong.albumidUrl" alt />
      </div>
      <div class="middle">
        <!-- 旋转图 -->
        <div class="pic">
          <img :src="currentSong.albumidUrl" alt :class="playIng" @click="togglePlay" />
        </div>
        <!-- 歌词 -->
        <Lyric></Lyric>
        <!-- 进度条 -->
        <Myprogress :startTime="startTime" :endTime="endTime" @hehe="seek"></Myprogress>

        <!-- 播放器 -->
        <audio
          controls
          @ended="ended"
          ref="audio"
          @canplay="canplay"
          @timeupdate="timeUpdata"
          src="http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400003LnSNo1ecdc3.m4a?guid=9323875240&vkey=00E56A236819853C8322FA81F4007205F55C7A1E4E3F8E00F70E8F70A80C505F5B178E03E0BEF71CD505D353B040CA3A94526BD005DE776B&uin=0&fromtag=38"
        ></audio>
      </div>
      <div class="bottom">
        <button @click="before">上一首</button>
        <button @click="togglePlay">暂停</button>
        <button @click="next">下一首</button>
        <select name id v-model="loopIndex">
          <option :value="index" v-for="(item,index) in loopList" :key="index">{{item}}</option>
        </select>
      </div>
    </div>
    <div class="small" v-else @click="goBig">
      <div class="left">
        <img :src="currentSong.albumidUrl" alt />
      </div>
      <div class="middle">
        <div class="singName">{{currentSong.songname}}</div>
        <div class="songSinger">{{currentSong.singer[0].name}}</div>
      </div>
      <div class="right">
        <button>暂停</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import Myprogress from "../Progress";
import Lyric from "../Lyric";
export default {
  components: { Myprogress, Lyric },
  data() {
    return {
      endTime: 0,
      startTime: 0,
      pinUrl: "",
      play: false,
      loopList: ["默认", "单曲循环", "列表循环", "随机播放"],
      loopIndex: ""
    };
  },
  computed: {
    ...mapState(["songList", "fullScreen", "loop"]),
    ...mapGetters(["currentSong"]),
    playIng() {
      return this.play ? "cd" : "cd paused";
    }
  },
  methods: {
    ...mapMutations([
      "changeFullScreen",
      "nextSongIndex",
      "beforeSongIndex",
      "changeSongIndex",
      "changeLoop"
    ]),
    //更改播放时间
    seek(s) {
      // console.log(s, "更改播放时间");
      if (!this.audio) return false;
      //更改播放时间
      this.audio.currentTime = s;
    },
    //播放完毕后选择播放模式
    ended() {
      console.log("播放完毕", this.loop);
      this.play = false;
      let count = parseInt(Math.random() * this.songList.length);
      switch (this.loop) {
        case 1:
          this.audio.play();
          this.play = true;
          break;
        case 2:
          this.nextSongIndex();
          break;
        case 3:
          this.changeSongIndex(count);
          break;

        default:
          break;
      }
    },
    // 下一首
    next() {
      this.nextSongIndex();
    },
    // 暂停
    stop() {
      this.audio.pause();
    },
    //上一首
    before() {
      this.beforeSongIndex();
    },
    goSmall() {
      this.changeFullScreen(false);
    },
    //大小屏切换
    goBig() {
      this.changeFullScreen(true);
    },
    canplay() {
      // console.log("111");
      this.audio = this.$refs.audio;
      this.audio.play();
      this.play = true;
      //获取歌曲总时间
      this.endTime = this.audio.duration;
    },
    //随着播放更新时间
    timeUpdata(e) {
      this.startTime = e.target.currentTime;
    },
    //切换要转圈圈
    togglePlay() {
      this.play = !this.play;
    }
  },
  watch: {
    play(newValue, oldValue) {
      if (!this.audio) return false;
      if (newValue) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    },
    currentSong(newValue, oldValue) {
      //  歌曲发生改变 应该自动播放
      console.log("歌曲发生改变");
      setTimeout(() => {
        // console.log(this.$refs.audio);
        this.$refs.audio.src =
          "http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400003Idtm746YJCM.m4a?guid=9323875240&vkey=2ADE734356DB8D2672627DFB08836A24F3D196F8E6DECEC08225C2624F2B881934D9047573D21A84CA913A59F812A6DE9A4CAC3EEB7EAB36&uin=0&fromtag=38";
        this.$refs.audio.play();
      }, 500);
    },
    //随机播放，单曲循环这些变了
    loopIndex(newValue, oldValue) {
      this.changeLoop(newValue);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../style/index.less";
.player {
  .big {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #222;
    .top {
      height: 60px;
      text-align: center;
      line-height: 40px;
      font-size: @fs-l;
      color: #fff;
      margin-bottom: 20px;
      .back {
        width: 40px;
        height: 40px;
        position: absolute;
        left: 0;
        top: 0;
      }
      .subtitle {
        font-size: @fs-s;
        height: 20px;
        text-align: center;
        line-height: 20px;
      }
    }
    .bg {
      position: absolute;
      top: 0;
      .w(375);
      height: 100%;
      z-index: -5;
      img {
        width: 100%;
        height: 100%;
        filter: blur(10px);
      }
    }
    .middle {
      height: 467px;
      text-align: center;
      .pic {
        height: 300px;
        img {
          display: inline-block;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          border: 10px solid rgba(255, 255, 255, 0.3);
        }
        & .cd {
          animation: rotate 15s linear infinite;
        }
        & .paused {
          animation-play-state: paused;
        }
      }
      .songWord {
        height: 20px;
        color: rgba(255, 255, 255, 0.5);
        font-size: @fs-s;
        margin-top: 20px;
      }
    }
  }
  @keyframes rotate {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
  .small {
    position: fixed;
    bottom: 0;
    height: 60px;
    .w(375);
    background-color: #333;
    display: flex;
    .left {
      width: 50px;
      height: 40px;
      padding: 10px 10px 0 20px;

      img {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        line-height: 40px;
        animation: rotate 15s linear infinite;
      }
    }
    .middle {
      width: 205px;
      height: 60px;
      font-size: @fs-s;
      padding: 10px 10px 0 0px;
      .singName {
        height: 20px;
        color: #fff;
        // margin: 0 10px 0 10px;
      }
      .songSinger {
        height: 20px;
        color: rgba(255, 255, 255, 0.5);
        font-size: @fs-xs;
        margin-top: 3px;
      }
    }
  }
}
</style>