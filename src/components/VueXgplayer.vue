<template>
  <div class="player-section">
    <div class="player-container">
      <div ref="playerDom" />
    </div>
    <div style="display: flex; justify-content: center; margin-top: 20px;">
      <el-button @click="minMode">迷你模式</el-button>
      <div>
        <el-input style="width: 300px;" v-model="danmuVal" />
        <el-button type="primary" @click="sendComment">发送弹幕</el-button>
      </div>
      <div>
        <el-switch v-model="danmuSwitch" @change="danmuSwitchChang" ></el-switch>
      </div>
      <div >
        <span>弹幕透明度：</span>
        <el-slider v-model="transparencySlider" @change="transparencyChange"></el-slider>
      </div>
    </div>
  </div>
</template>

<script>
import Player from 'xgplayer'
import '@/xgplayer/skin/index.js'

export default {
  name: 'VueXgplayer',
  props: {
    config: {
      type: Object,
      default () {
        return { id: 'mse', url: '' }
      }
    }
  },
  data: function () {
    return {
      player: null,
      danmuVal: '我是弹幕我是弹幕我是弹幕',
      danmuSwitch: true,
      transparencySlider: 20
    }
  },
  watch: {
    config: {
      handler: function () {
        this.init()
      },
      deep: true
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.player && typeof this.player.destroy === 'function' && this.player.destroy() // 销毁播放器
  },
  methods: {
    // 初始化播放器
    init () {
      if (this.config.url && this.config.url !== '') {
        const dom = this.$refs['playerDom']
        this.player = new Player({ el:dom, ...this.config })
        this.$emit('player', this.player)
        this.player.on('playing',()=>{
          console.log('playing');
          this.player.danmu.play() //弹幕继续播放
        })
        this.player.on('pause',()=>{
          console.log('pause');
          this.player.danmu.pause() //弹幕暂停
        })
      }
    },
    minMode(){
      this.player.getMiniplayer()
    },
    danmuSwitchChang(val){
      if(val){
        this.player.danmu.start()
      }else{
        this.player.danmu.stop()
      }
    },
    transparencyChange(val) {
      console.log(val / 100)
      console.log(this.player.config.danmu.comments);
      this.player.config.danmu.comments.forEach(item => {
        item.style.opacity = val / 100
      })
    },
    sendComment(){
      let danmuId = new Date().getTime()
      console.log(this.player.currentTime.toFixed(1) * 1000);
      this.player.danmu.sendComment({  //发送弹幕
        duration: 5000,
        id: danmuId,
        start: this.player.currentTime.toFixed(1) * 1000,
        txt: this.danmuVal,
        style: {
          color: '#fff',
          opacity: this.transparencySlider / 100,
          fontSize: '24px',
          // border: 'solid 1px #ff9500',
          // borderRadius: '50px',
          // padding: '5px 11px',
          // backgroundColor: 'rgba(255, 255, 255, 0.1)'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.player-section{
  .player-container{
    width: 910px;
    height: 512px;
    background: #222;
    margin: 20px auto;
  }
}
</style>
