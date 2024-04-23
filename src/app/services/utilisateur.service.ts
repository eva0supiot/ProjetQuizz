import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Utilisateur } from "models/utilisateur.model"
import { Course } from "models/course.model"
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: "root",
})
export class UtilisateurService {
  constructor(private http: HttpClient) {}

  private utilisateursUrl = "http://localhost:8080/utilisateurs"

  findAll(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.utilisateursUrl)
  }

  findById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.utilisateursUrl}/${id}`)
  }

  update(id: number, utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.utilisateursUrl}/${id}`, utilisateur)
  }

  add(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.utilisateursUrl, utilisateur)
  }

  delete(utilisateur: Utilisateur) {
    return this.http.delete(`${this.utilisateursUrl}/${utilisateur.id}`)
  }

  /*addCourseToUtilisateur(utilisateur: Utilisateur, course: Course) {
    if (utilisateur.courses == undefined) {
      utilisateur.courses = [course]
    } else {
      utilisateur.courses.push(course)
    }
    return utilisateur
  }

  removeCourseToUtilisateur(utilisateur: Utilisateur, course: Course) {
    const index = utilisateur.courses?.indexOf(course)
    if (index!! > -1) {
      utilisateur.courses?.splice(index!!, 1)
    }
    return utilisateur
  }*/
}
