import { Quizz } from "./quizz.model"

export interface Question {
  id?: bigint
  contenu : string
  image? : string | null
  quizz : Quizz
}
