import * as THREE from 'three'

export const Lights = (): THREE.Group => {
    const group = new THREE.Group();

    // Dir light
    let directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.castShadow = true
    directionalLight.position.set(-25, 100, 100)
    directionalLight.rotation.set(45, 10, 0)
    directionalLight.castShadow = true;
    directionalLight.intensity = 0.5

    // Point light
    let light = new THREE.PointLight(0xff0000, 1, 100)
    light.add(new THREE.Mesh(new THREE.SphereGeometry(0.1), new THREE.MeshBasicMaterial({ color: 0xff0000 })))
    light.position.set(0, 1, 1)
    light.intensity = 5

    group.add(directionalLight)
    group.add(light)
    return group;
}