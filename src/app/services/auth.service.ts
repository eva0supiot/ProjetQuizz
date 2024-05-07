import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Utilisateur } from "../models/utilisateur.model";
import { HttpClient } from '@angular/common/http'; // Importez HttpClient

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Utilisateur | null> = new BehaviorSubject<Utilisateur | null>(JSON.parse(localStorage.getItem('currentUser')!));
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  public get currentUserValue(): Utilisateur | null {
    return this.currentUserSubject.value;
  }

  login(user: Utilisateur) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  refreshCurrentUser() {
    const userId = this.currentUserValue?.id; // Récupérez l'ID de l'utilisateur actuellement connecté
    if (userId) {
      this.http.get<Utilisateur>(`http://localhost:8080/utilisateurs/${userId}`).subscribe(
        user => {
          // Mettez à jour les données utilisateur actuelles avec les données récupérées
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        },
        error => {
          console.error('Erreur lors de la récupération des données utilisateur:', error);
        }
      );
    }
  }

}
