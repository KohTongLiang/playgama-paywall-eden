import { Engine } from '../engine/Engine'
import * as THREE from 'three'
import { Experience } from '../engine/Experience'
import { Resource } from '../engine/Resources'

import { Lights } from './objects/Lights'
import { Box } from './objects/Box'

let lightObject: THREE.Group
let boxObject: THREE.Group
let boxPosition: THREE.Vector3


export class Demo implements Experience {
  resources: Resource[] = [
    {
      name: "numpad",
      type: "gltf",
      path: "assets/numpad.glb"
    }
  ]

  constructor(private readonly engine: Engine) { }


  init() {
    // Plane
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshPhongMaterial({ color: 0xa0adaf, shininess: 150, alphaToCoverage: true }),
    )

    this.engine.camera.instance.position.set (0, 3, -4)

    const axesHelper = new THREE.AxesHelper(5)

    this.engine.scene.background = new THREE.Color(0x000000)

    plane.rotation.x = -Math.PI / 2
    plane.receiveShadow = true

    boxObject = Box();
    lightObject = Lights();
    boxPosition = new THREE.Vector3(0, 0, 0);

    this.engine.scene.add(plane)
    this.engine.scene.add(boxObject)
    this.engine.scene.add(lightObject);
    this.engine.scene.add(this.engine.resources.getItem("numpad"))
    this.engine.scene.add(axesHelper)

    window.addEventListener("keydown", e => {
      if (e.key === "w") {
        boxPosition.z = 0.1;
      }

      if (e.key === "s") {
        boxPosition.z = -0.1
      }

      if (e.key === "a") {
        boxPosition.x = 0.1
      }

      if (e.key === "d") {
        boxPosition.x = -0.1
      }
    })

    window.addEventListener("keyup", (e) => {
      if (e.key === "w" || e.key === "s") {
        boxPosition.z = 0;
      }

      if (e.key === "a" || e.key === "d") {
        boxPosition.x = 0
      }
    })

  }

  resize() { }

  update() {
    boxObject.position.set(
      boxObject.position.x + boxPosition.x,
      boxObject.position.y + boxPosition.y,
      boxObject.position.z + boxPosition.z,
    )
  }
}
