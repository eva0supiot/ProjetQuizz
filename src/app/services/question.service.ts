import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Question } from "models/question.model"
import { HttpClient } from "@angular/common/http"
import { Quizz } from "../models/quizz.model"

@Injectable({
  providedIn: "root",
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  private questionsUrl = "http://localhost:8080/questions"

  findAll(): Observable<Question[]> {
    return this.http.get<Question[]>(this.questionsUrl)
  }

  update(id: number, question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.questionsUrl}/${id}`, question)
  }

  add(question: Question): Observable<Question> {
    return this.http.post<Question>(this.questionsUrl, question)
  }

  delete(question: Question) {
    return this.http.delete(`${this.questionsUrl}/${question.id}`)
  }
}
