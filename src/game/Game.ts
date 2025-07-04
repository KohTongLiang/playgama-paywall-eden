import { Engine } from '../engine/Engine'
import * as THREE from 'three'
import { Node } from '../engine/Node'
import { Resource } from '../engine/Resources'

import { Lights } from './environment/Lights'
import { PlaneFloor } from './environment/PlaneFloor'

let lightObject: THREE.Group
let floor: THREE.Group

export class Game implements Node {
  resources: Resource[] = [
    {
      name: "numpad",
      type: "gltf",
      path: "assets/numpad.glb"
    }
  ]

  constructor(private readonly engine: Engine) { }


  init() {
    this.engine.camera.instance.position.set (0, 3, -4)
    this.engine.scene.background = new THREE.Color(0x000000)

    lightObject = Lights();
    floor = PlaneFloor();

    this.engine.scene.add(floor)
    this.engine.scene.add(lightObject);
    this.engine.scene.add(this.engine.resources.getItem("numpad"))

    /// Sample input mapping
    window.addEventListener("keydown", e => {
      if (e.key === "w") {
        lightObject.position.setZ(lightObject.position.z + 0.1)
      }

      if (e.key === "s") {
        lightObject.position.setZ(lightObject.position.z - 0.1)
      }

      if (e.key === "a") {
        lightObject.position.setX(lightObject.position.x + 0.1)
      }

      if (e.key === "d") {
        lightObject.position.setX(lightObject.position.x - 0.1)
      }
    })
  }

  resize() { }

  update() {

  }
}
