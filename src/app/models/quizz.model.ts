import { Question } from "./question.model"

export interface Quizz {
  id?: bigint
  titre: string
  image?: string | null;
}
