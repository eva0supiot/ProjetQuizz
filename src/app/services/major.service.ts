import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Major } from "models/major.model"
import { HttpClient } from "@angular/common/http"
import { Utilisateur } from "../models/utilisateur.model"

@Injectable({
  providedIn: "root",
})
export class MajorService {
  constructor(private http: HttpClient) {}

  private majorUrl = "http://localhost:8080/majors"

  findAll(): Observable<Major[]> {
    return this.http.get<Major[]>(this.majorUrl)
  }

  findUtilisateursFromMajor(majorId: string): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.majorUrl + `/${majorId}/utilisateurs`)
  }
}
