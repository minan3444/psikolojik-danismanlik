import { blogType } from './blogType'
import { vakaType } from './vakaType'
import { hakkimdaType } from './hakkimdaType'
import { legalType } from './legalType' // Eklendi

export const schema = {
  types: [blogType, vakaType, hakkimdaType, legalType],
}