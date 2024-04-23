import { Question } from "./question.model"

export interface Reponse {
  id?: bigint
  contenu : string
  solution : boolean
  question : Question
}
