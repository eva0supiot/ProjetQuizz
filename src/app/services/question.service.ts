import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Question } from "models/question.model"
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: "root",
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  private questionsUrl = "http://localhost:8080/questions"

  findAll(): Observable<Question[]> {
    return this.http.get<Question[]>(this.questionsUrl)
  }
}
