import './style.scss'
import { Engine } from './engine/Engine'
import { Game } from './game/Game'
import { TheButton } from './game/TheButton'

// Create and initialize the engine asynchronously
const init = async () => {
  try {
    // Wait for engine to initialize with Rapier loaded
    await Engine.create({
      canvas: document.querySelector('#canvas') as HTMLCanvasElement,
      experience: [Game, TheButton],
    })
    
    console.log('Engine initialized successfully')
  } catch (error) {
    console.error('Failed to initialize the engine:', error)
  }
}

// Start initialization
init().then(() => console.log("Init complete."))
