# A Theejs engine

## Dependencies

* Rendering - [Threejs](https://threejs.org/docs/)
* Physics - [Rapier](https://rapier.rs/docs/user_guides/javascript/getting_started_js)
* Shader Library - [Lygia](https://github.com/patriciogonzalezvivo/lygia)

## Setup

Retrieve relevant submodules

```bash
yarn preinstall
```

Install depedencies

```bash
yarn
yarn dev
```

## Build

Build project. The project uses vite plugin static copy to copy any assets into the final build file. Place all assets under assets folder.

```bash
yarn build
yarn preview
```
Final build will be located within dist folder.

# Example Usage

```TypeScript
import { Engine } from '../engine/Engine'
import * as THREE from 'three'
import { Box } from './Box'
import { Experience } from '../engine/Experience'
import { Resource } from '../engine/Resources'

export class Demo implements Experience {
  resources: Resource[] = []

  constructor(private engine: Engine) {}

  init() {
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    )

    plane.rotation.x = -Math.PI / 2
    plane.receiveShadow = true

    this.engine.scene.add(plane)
    this.engine.scene.add(new THREE.AmbientLight(0xffffff, 0.5))

    let directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.castShadow = true
    directionalLight.position.set(2, 2, 2)

    this.engine.scene.add(directionalLight)

    this.engine.scene.add(box)
  }

  resize() {}

  update() {}
}
```
