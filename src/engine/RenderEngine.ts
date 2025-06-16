import * as THREE from 'three';

import { WebGPURenderer, PostProcessing } from 'three/src/Three.WebGPU';


import { Engine } from './Engine';
import { GameEntity } from './GameEntity';
import { pass } from 'three/src/nodes/display/PassNode'
// import { pass } from 'three/src/Three.TSL'

export class RenderEngine implements GameEntity {
  // Renderer is now public readonly to allow access from other parts of the engine if needed
  public readonly renderer: WebGPURenderer;
  private readonly composer: PostProcessing;
  private readonly engine: Engine;

  // Private constructor to enforce initialization via the static async method
  private constructor(engine: Engine, renderer: WebGPURenderer, composer: PostProcessing) {
    this.engine = engine;
    this.renderer = renderer;
    this.composer = composer;
  }

  /**
   * Asynchronously creates and initializes the RenderEngine.
   * This pattern ensures the renderer is fully initialized before we proceed.
   */
  public static async create(engine: Engine): Promise<RenderEngine> {
    const renderer = new WebGPURenderer({
      canvas: engine.canvas,
      antialias: true,
    });

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.75;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // We don't need to set a clear color here, as the scene's background or a pass will handle it.

    renderer.setSize(engine.sizes.width, engine.sizes.height);
    renderer.setPixelRatio(Math.min(engine.sizes.pixelRatio, 2));

    // Initialize the WebGPU renderer
    await renderer.init();

    // Setup post-processing
    const scenePass = pass(engine.scene, engine.camera.instance);
    const composer = new PostProcessing(renderer);
    composer.outputNode = scenePass; // Assign the scene pass directly to the output

    return new RenderEngine(engine, renderer, composer);
  }

  // initEngine() is no longer needed as creation is handled asynchronously.

  public update(): void {
    // Only the composer needs to be rendered. It handles the scene render pass internally.
    this.composer.renderAsync().then();
  }

  public resize(): void {
    // Update renderer dimensions. The composer will pick this up on the next render call.
    this.renderer.setSize(this.engine.sizes.width, this.engine.sizes.height);

    // You don't need to call renderAsync() here. The main update loop will handle it.
  }
}