import * as THREE from 'three';

export const PlaneFloor = (): THREE.Group => {
  const group = new THREE.Group();
  let plane = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    // new THREE.MeshPhongMaterial({ color: 0xa0adaf, shininess: 150, alphaToCoverage: true }),
    new THREE.MeshBasicMaterial({
      color: 0x00ffff,
    })
  )

  plane.rotation.x = -Math.PI / 2
  plane.receiveShadow = true

  group.add(plane)
  return group;
}
