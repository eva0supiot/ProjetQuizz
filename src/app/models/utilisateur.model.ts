import { Course } from "./course.model"
import { Major } from "./major.model"

export interface Utilisateur {
  id?: bigint
  pseudo: string
  mdp: string
  admin: boolean
  scores: string
  pdp?: string
//  courses?: Course[]
//  major: Major
}
