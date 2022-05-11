import { createDom } from 'xgplayer/src/utils/util'
import MiniPlayIcon from '../assets/miniPlay.svg'
import '../style/controls/miniplayer.scss'

let s_miniplayer = function () {
  let player = this
  if (!player.config.miniplayer) { return }
  let btn = createDom('xg-miniplayer', `<xg-icon class="xgplayer-icon">${MiniPlayIcon}</xg-icon>`, {tabindex: 9}, 'xgplayer-miniplayer')
  let tipsText = player.lang.MINIPLAYER
  let tips = createDom('xg-tips', `<span class="xgplayer-tip-miniplayer">${tipsText}</span>`, {}, 'xgplayer-tips')
  btn.appendChild(tips)
  player.once('ready', () => {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(item => {
    btn.addEventListener(item, e => {
      e.preventDefault()
      e.stopPropagation()
      player.userGestureTrigEvent('miniplayerBtnClick')
    })
  })
}

export default {
  name: 's_miniplayer',
  method: s_miniplayer
}