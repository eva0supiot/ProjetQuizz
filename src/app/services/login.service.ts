import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedInUsername: string | null = null;

  constructor() { }

  getUsername(): string | null {
    return this.loggedInUsername;
  }

  setUsername(username: string): void {
    this.loggedInUsername = username;
  }

}
