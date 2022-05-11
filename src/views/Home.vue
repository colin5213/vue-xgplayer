<template>
  <div class="home">
    <vue-xgplayer :config="playerConfig" @player="resourceReady" />
    <!-- <vue-xgplayer :config="playerConfig" @player="resourceReady" /> -->
  </div>
</template>

<script>
import VueXgplayer from '@/components/VueXgplayer.vue'
const videoUrl = '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4'
export default {
  name: 'Home',
  components: {
    VueXgplayer
  },
  data () {
    return {
      playerConfig: {
        ignores: ['download'], //配置项关闭
        url: videoUrl,
        // poster: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg', // 封面
        // fluid: true, // 流体大小
        width: '100%',
        height: '100%',
        volume: 0.8, // 音量
        videoInit: true, // 初始化显示视频首帧
        autoplay: false, // 自动播放
        playbackRate: [0.5, 0.75, 1.0, 1.5, 3.0], // 倍速
        defaultPlaybackRate: 1.0, // 初始倍数
        pip: false, // #画中画
        miniplayer: true, // 开启小窗
        closeVideoClick: false,
        closeVideoDblclick: true, //video触发dblclick事件后进入/退出全屏
        miniplayerConfig: { // 小窗配置
          bottom: 50,
          right: 50,
          width: 320,
          height: 180
        },
        thumbnail: { // 预览图
          pic_num: 44, // 该视频资源所需预览小图数量
          width: 160,
          height: 90,
          col: 10,
          row: 10,
          urls: ['//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo-thumbnail.jpg']
        },
        // rotate: {   //视频旋转按钮配置项
        //   innerRotate: true, //只旋转内部video
        //   clockwise: false // 旋转方向是否为顺时针
        // },
        progressDot: [ //进度条特殊点标记
          {
            time: 10, //展示标记的时间
            text: '标记文字', //鼠标hover在标记时展示的文字
            duration: 4, //标记段长度（以时长计算）
            style: { //标记样式
              background: '#f00'
            }
          }, {
            time: 22,
            text: '<img src="https://wx2.sinaimg.cn/orj360/003nChGVgy1h24alf853zj60hs0a0aa802.jpg" width="100px" height="100px" />'
          }, {
            time: 56,
            duration: 1,
          }, {
            time: 76,
          }
        ],
        download: true, //设置download控件显示
        playNext: { // 下一集
          urlList: [videoUrl]
        },
        cssFullscreen: true, // 样式横屏全屏
        errorTips: '加载失败,请<span>刷新</span>试试', // 自定义错误提示
        playsinline: true, // 在线播放
        danmu: {
          comments: [  //弹幕数组
            {
              duration: 10000,
              id: '1',
              start: 3000,
              txt: '长弹幕长弹幕长弹幕长弹幕长弹幕',
              style: {  //弹幕自定义样式
                color: '#ff9500',
                fontSize: '20px',
                border: 'solid 1px #ff9500',
                borderRadius: '50px',
                padding: '5px 11px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            },
            {
              duration: 10000,
              id: '2',
              start:  15*1000,
              txt: '长弹幕长弹幕',
              prior: false, //该条弹幕优先显示，默认false
              color: true, //该条弹幕为彩色弹幕，默认false
              style: {  //弹幕自定义样式
                color: '#ff9500',
                fontSize: '20px',
                border: 'solid 1px #ff9500',
                borderRadius: '50px',
                padding: '5px 11px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }
          ],
          area: {  //弹幕显示区域
            start: 0, //区域顶部到播放器顶部所占播放器高度的比例
            end: 1 //区域底部到播放器顶部所占播放器高度的比例
          },
          panel: false, //弹幕面板
          closeDefaultBtn: false, //开启此项后不使用默认提供的弹幕开关，默认使用西瓜播放器提供的开关
          defaultOff: false
        }
      }
    }
  },
  methods: {
    resourceReady (player) {
      player.emit('resourceReady', [
        { name: '超清', url: videoUrl },
        { name: '高清', url: videoUrl+'&aa=11' },
        { name: '标清', url: videoUrl+'&aa=22' }
      ])
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  height: 2000px;
}
</style>