import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Reponse } from "models/reponse.model"
import { Question } from "../models/question.model"
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: "root",
})
export class ReponseService {
  constructor(private http: HttpClient) {}

  private reponsesUrl = "http://localhost:8080/reponses"

  findAll(): Observable<Reponse[]> {
    return this.http.get<Reponse[]>(this.reponsesUrl)
  }
}
