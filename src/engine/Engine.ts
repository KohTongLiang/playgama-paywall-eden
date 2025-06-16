import * as THREE from 'three'
import { RenderEngine } from './RenderEngine'
import { RenderLoop } from './RenderLoop'
import { DebugUI } from './interface/DebugUI'
import { Sizes } from './Sizes'
import { Camera } from './Camera'
import { Resource, Resources } from './Resources'
import { InfoConfig, InfoUI } from './interface/InfoUI'
import { Node } from './Node'
import { Loader } from './interface/Loader'
import { Raycaster } from './Raycaster'
import type RAPIER from '@dimforge/rapier3d'

export class Engine {
  public readonly camera: Camera
  public readonly scene: THREE.Scene
  public renderEngine!: RenderEngine
  public readonly time: RenderLoop
  public readonly debug: DebugUI
  public readonly raycaster: Raycaster
  public readonly infoUI: InfoUI
  public readonly sizes: Sizes
  public readonly canvas: HTMLCanvasElement
  public readonly resources: Resources
  public readonly experience: Node[]
  public readonly physicsWorld: any
  private readonly loader: Loader
  public static rapier: typeof RAPIER | null = null

  /**
   * Static method to create and initialize the engine asynchronously
   */
  public static async create({
                               canvas,
                               nodes,
                               info,
                             }: {
    canvas: HTMLCanvasElement
    nodes: Node[]
    info?: InfoConfig
  }): Promise<Engine> {
    // Load Rapier first
    Engine.rapier = await import('@dimforge/rapier3d')

    // Create the engine instance
    const engine = new Engine({ canvas, nodes, info })

    // CORRECTED: Call the private async initializer without arguments
    await engine.init()

    // Return the fully initialized engine
    return engine
  }

  private constructor({
                        canvas,
                        nodes,
                        info,
                      }: {
    canvas: HTMLCanvasElement
    nodes: Node[]
    info?: InfoConfig
  }) {
    // (Constructor code remains the same as before, no changes needed here)
    if (!canvas) {
      throw new Error('No canvas provided')
    }

    if (!Engine.rapier) {
      throw new Error('Rapier must be loaded before creating an Engine instance')
    }

    this.canvas = canvas
    this.sizes = new Sizes(this)
    this.debug = new DebugUI()
    this.time = new RenderLoop(this)
    this.scene = new THREE.Scene()
    this.camera = new Camera(this)
    this.raycaster = new Raycaster(this)
    this.infoUI = new InfoUI(info)
    this.experience = []

    let resources : Resource[] = []
    nodes.forEach((e: Node) => {
      let newExperience = new e(this)
      this.experience.push(newExperience)
      resources = resources.concat(newExperience.resources)
    })

    this.resources = new Resources(resources)
    this.loader = new Loader()
    this.physicsWorld = new Engine.rapier.World({
      x: 0.0,
      y: -9.81,
      z: 0.0,
    })

    this.resources.on('loaded', () => {
      this.experience.forEach(ex => ex.init())
      this.loader.complete()
    })

    this.resources.on('progress', (progress: number) => {
      this.loader.setProgress(progress)
    })
  }

  /**
   * CORRECTED: The init method's job is to CREATE the async components.
   * It should not take any arguments.
   */
  private async init() {
    // It uses `this` to pass the engine instance to the RenderEngine's creator.
    this.renderEngine = await RenderEngine.create(this);
  }

  // update() and resize() methods remain the same, they will work correctly now.
  update(delta: number) {
    if (!this.loader?.isComplete) return

    this.physicsWorld.step()
    this.camera.update()
    this.renderEngine.update()
    this.experience.forEach(ex => ex.update(delta))
    this.debug.update()
  }

  resize() {
    this.camera.resize()
    this.renderEngine.resize()
    this.experience.forEach(ex => {
      if (ex.resize) ex.resize()
    })
  }
}