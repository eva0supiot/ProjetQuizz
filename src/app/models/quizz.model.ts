import { Question } from "./question.model"

export interface Quizz {
  id?: bigint
  titre: string
  img?: string | null;
}
