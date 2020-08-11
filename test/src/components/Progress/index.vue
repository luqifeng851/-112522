<template>
  <div class="progress">
    <span>{{startTime|handerTime}}</span>
    <div class="wrapper" ref="wrapper" @click="clickProgress">
      <div class="content" ref="content"></div>
      <div
        class="big"
        ref="dot"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
      >
        <div class="small"></div>
      </div>
    </div>
    <span>{{endTime|handerTime}}</span>
  </div>
</template>
<script>
export default {
  methods: {
    jump(precent) {
      let time = (precent * this.endTime) / 100;
      // console.log(time, "time");
      //调用父组件的方法
      this.$emit("hehe", time);
    },
    touchStart() {
      // console.log("按下");
      this.touch = true;
      this.distance = 0;
    },
    touchMove(e) {
      let left = this.$refs.wrapper.getBoundingClientRect().left;
      let width = this.$refs.wrapper.clientWidth;
      this.distance = e.touches[0].pageX - left;
      if (this.distance >= 0 && this.distance <= width) {
        this.offsetMove(this.distance);
      }
      console.log("移动", e.touches[0].pageX);
    },
    touchEnd() {
      // console.log("抬起");
      this.touch = false;
      this.offsetMove(this.distance);
    },
    clickProgress(e) {
      let x = e.pageX;
      let left = this.$refs.wrapper.getBoundingClientRect().left;
      // console.log(x, left);
      let distance = x - left;
      this.offsetMove(distance);
    },
    offsetMove(distance) {
      let precent = (distance / this.$refs.wrapper.clientWidth) * 100;
      this.$refs.content.style.width = precent + "%";
      //小圆点也要移动
      let width = (this.$refs.wrapper.clientWidth * precent) / 100;
      this.$refs.dot.style.transform = `translateX(${width}px)`;
      if (this.touch) {
        return false;
      }
      this.jump(precent);
    }
  },
  props: {
    startTime: { type: Number, default: "0:00" },
    endTime: { type: Number, default: "0:00" }
  },
  filters: {
    handerTime(data) {
      let time = parseInt(data);
      let m = parseInt(time / 60);
      let s = time % 60;
      s = s < 10 ? `0${s}` : s;
      return m + ":" + s;
    }
  },
  watch: {
    startTime(newValue, oldValue) {
      if (this.touch) return false;
      let precent = (this.startTime / this.endTime) * 100;
      //   进度条样式
      this.$refs.content.style.width = precent + "%";
      // 控制小圆点
      let width = (this.$refs.wrapper.clientWidth * precent) / 100;
      this.$refs.dot.style.transform = `translateX(${width}px)`;
    }
  },
  created() {
    this.touch = false;
  }
};
</script>
<style lang="less" scoped>
@import "../../style/index.less";
.progress {
  height: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  font-size: @fs-s;
  .w(375);
  span {
    width: 30px;
    margin: 4px;
  }
  .wrapper {
    .w(270);
    height: 4px;
    background-color: rgba(0, 0, 0, 0.3);
    position: relative;
    .content {
      background-color: @yellow;
      width: 0%;
      height: 4px;
    }
    .big {
      width: 16px;
      height: 16px;
      background-color: #fff;
      border-radius: 50%;
      position: absolute;
      top: -6px;
      .small {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: @yellow;
      }
    }
  }
}
</style>