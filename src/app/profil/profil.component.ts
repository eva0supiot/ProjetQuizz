import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from "@angular/common"
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router"
import {Observable, of} from "rxjs";
import {MatRadioButton, MatRadioChange, MatRadioGroup} from "@angular/material/radio";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardHeader, MatCardSmImage, MatCardTitle, MatCardTitleGroup} from "@angular/material/card";
import { Utilisateur } from "../models/utilisateur.model"
import { QuizzService } from "../services/quizz.service"
import { UtilisateurService } from "../services/utilisateur.service"
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatRadioGroup, MatRadioButton, ReactiveFormsModule, MatButton, MatCard, MatCardHeader, MatCardTitleGroup, MatCardTitle, MatCardSmImage, NgOptimizedImage],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {
  utilisateurs$: Observable<Utilisateur[]> = this.utilisateurService.findAll();
  utilisateur: Utilisateur | null = null;

  constructor(private _route: ActivatedRoute, private utilisateurService: UtilisateurService, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.utilisateur = user;
    });
  }

  logout() {
    this.authService.logout();
    // Redirigez l'utilisateur vers la page de connexion ou d'accueil après la déconnexion
    this.router.navigate(['/login']);
  }


}
