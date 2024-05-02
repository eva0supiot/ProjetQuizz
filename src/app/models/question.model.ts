import { Quizz } from "./quizz.model"

export interface Question {
  id?: number
  contenu : string
  image? : string | null
  quizz : Quizz
}
