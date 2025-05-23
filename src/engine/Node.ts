import { GameEntity } from './GameEntity'
import { Engine } from './Engine'
import { Resource } from './Resources'

export type ExperienceConstructor = new (engine: Engine) => Node
export interface Node extends GameEntity {
  init(): void
  resources: Resource[]
}
