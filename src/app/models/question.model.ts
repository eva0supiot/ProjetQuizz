import { Quizz } from "./quizz.model"

export interface Question {
  id?: number
  contenu : string
  quizz : Quizz
}
