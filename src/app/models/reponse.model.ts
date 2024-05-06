import { Question } from "./question.model"

export interface Reponse {
  id?: number
  contenu : string
  solution : boolean
  question : Question
}
