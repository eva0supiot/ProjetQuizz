import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Question } from "models/question.model"
import { HttpClient } from "@angular/common/http"
import { Quizz } from "../models/quizz.model"

@Injectable({
  providedIn: "root",
})
export class QuizzService {
  private quizzSelectionne: any;
  constructor(private http: HttpClient) {}

  private quizzesUrl = "http://localhost:8080/quizzes"

  findAll(): Observable<Quizz[]> {
    return this.http.get<Quizz[]>(this.quizzesUrl)
  }



}
