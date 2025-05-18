import './style.scss'
import { Engine } from './engine/Engine'
import { Demo } from './game/Demo'

new Engine({
  canvas: document.querySelector('#canvas') as HTMLCanvasElement,
  experience: Demo,
})
