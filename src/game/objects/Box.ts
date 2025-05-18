import * as THREE from 'three';

export const Box = (): THREE.Group => {
  const group = new THREE.Group();

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x0000FF, reflectivity: 0.5 })
  const cube = new THREE.Mesh(geometry, material)
  cube.position.set(0, 1, 0)
  cube.castShadow = true

  group.add(cube)


  return group;
}
