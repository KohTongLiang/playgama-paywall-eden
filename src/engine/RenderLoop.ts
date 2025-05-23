import { Engine } from './Engine'
import * as THREE from 'three'

export class RenderLoop {
  private clock: THREE.Clock
  public deltaTime: number = 16
  public currentTime: number = 0
  private animationFrameId: number | null = null

  constructor(private engine: Engine) {
    this.clock = new THREE.Clock()
    // Start the animation loop
    this.start()
  }

  start(): void {
    // Only start if not already running
    if (this.animationFrameId === null) {
      this.clock.start()
      this.update()
    }
  }

  stop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId)
      this.animationFrameId = null
      this.clock.stop()
    }
  }

  update() {
    const step = () => {
      this.animationFrameId = requestAnimationFrame(step)
      const elapsedTime = this.clock.getElapsedTime()

      this.deltaTime = elapsedTime - this.currentTime
      this.currentTime = elapsedTime

      this.engine.update(this.deltaTime)
    }
    step()
  }
}
