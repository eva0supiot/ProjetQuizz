import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Question } from "models/question.model"
import { HttpClient } from "@angular/common/http"
import { Quizz } from "../models/quizz.model"
import { Utilisateur } from "../models/utilisateur.model"

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
  findById(id: number): Observable<Quizz> {
    return this.http.get<Quizz>(`${this.quizzesUrl}/${id}`)
  }

  update(id: number, quizz: Quizz): Observable<Quizz> {
    return this.http.post<Quizz>(`${this.quizzesUrl}/${id}`, quizz)
  }

  add(quizz: Quizz): Observable<Quizz> {
    return this.http.post<Quizz>(this.quizzesUrl, quizz)
  }


  delete(quizz: Quizz) {
    return this.http.delete(`${this.quizzesUrl}/${quizz.id}`)
  }
}
