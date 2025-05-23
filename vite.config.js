import glsl from 'vite-plugin-glsl'
import topLevelAwait from 'vite-plugin-top-level-await'
import wasmPlugin from 'vite-plugin-wasm'

import { defineConfig } from 'vite'
import path from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  server: {
    hmr: {
      overlay: true,  // Shows errors in the browser overlay
    },
  },
  resolve: {
    alias: {
      'three': path.resolve(__dirname, 'node_modules/three'),
      'three/webgpu': path.resolve(__dirname, 'node_modules/three/build/three.webgpu.min.js'),
      // 'three' : 'three/webgpu',
      // 'three/tsl': 'three/webgpu',
      'three/tsl': path.resolve(__dirname, 'node_modules/three/build/three.tsl.js'),
      'three/addons': path.resolve(__dirname, 'node_modules/three/examples/jsm'),
      'three/examples': path.resolve(__dirname, 'node_modules/three/examples')
    },
  },
  plugins: [
    glsl(),
    wasmPlugin(),
    topLevelAwait({
      promiseExportName: '__tla',
      promiseImportName: (i) => `__tla_${i}`,
    }),
    viteStaticCopy({
      targets: [ 
      {
        src: 'assets',
        dest: ''
      }
      ]
    })
  ],
})
