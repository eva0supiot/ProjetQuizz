import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Utilisateur } from "../models/utilisateur.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Utilisateur | null> = new BehaviorSubject<Utilisateur | null>(JSON.parse(localStorage.getItem('currentUser')!));
  public currentUser = this.currentUserSubject.asObservable();

  constructor() {}

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
}
