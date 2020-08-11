import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


let store = new Vuex.Store({
  state: {
    show: false,
    songList: [], //获取歌曲列表，有就显示，没有就不显示
    fullScreen: true, //大小屏显示
    songsIndex: -1, //播放哪首歌曲
    loop: 3 //0：不循环  1 单曲循环 2 列表循环 3 随机播放
  },
  getters: {
    currentSong(state) {
      return state.songList[state.songsIndex] || null
    }
  },
  mutations: {
    addsongList(state, params) {
      state.songList = params
    },
    changeFullScreen(state, params) {
      state.fullScreen = params
    },
    changeSongIndex(state, params) {
      state.songsIndex = params
    },
    nextSongIndex(state) {
      let count = state.songList.length;
      if (state.songsIndex < count - 1) {
        state.songsIndex++
      } else {
        state.songsIndex = 0
      }

    },
    beforeSongIndex(state) {
      let count = state.songList.length;
      if (state.songsIndex > 0) {
        state.songsIndex--
      } else {
        state.songsIndex = count - 1
      }
    },
    changeLoop(state, loopModel) {
      state.loop = loopModel;
    }
  },
  actions: {}
})
export default store
