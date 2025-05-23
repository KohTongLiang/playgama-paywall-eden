import * as THREE from 'three';
import { Engine } from '../../engine/Engine'

export class TheButton implements Node {
  resources: Resource[] = []
  constructor(private readonly engine: Engine) { }

  init() {
    let boxGeometry = new THREE.BoxGeometry(1,1,1)
    let boxMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00})
    let button = new THREE.Mesh(boxGeometry, boxMaterial)

    button.position.set(0, 1, 0)
    button.name = "thebutton";
    this.engine.scene.add(button)

    /// Testing raycasting
    this.engine.raycaster.on("click", (intersections: Array<Intersection<TIntersected>>) => {
      // console.log(intersections)
      if (intersections?.length > 0) {
        let hit = intersections[0].object
        if (hit.name === "thebutton") {
          if (hit.scale.x === 1) {
            hit.scale.set(0.7, 0.7, 0.7)
          } else {
            hit.scale.set(1, 1, 1)
          }
        }
        console.log(hit.name)
        console.log(hit)
      }
    })
  }

  resize() { }

  update() {

  }
}