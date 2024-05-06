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
  selector: 'profil',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatRadioGroup, MatRadioButton, ReactiveFormsModule, MatButton, MatCard, MatCardHeader, MatCardTitleGroup, MatCardTitle, MatCardSmImage, NgOptimizedImage],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {
  utilisateurs$: Observable<Utilisateur[]> = this.utilisateurService.findAll();
  utilisateur: Utilisateur | null = null;

  scoreCumule:number = 0;

  scores: { quizz: string; score: string; }[] = [];

  constructor(private _route: ActivatedRoute, private utilisateurService: UtilisateurService, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.utilisateur = user;
        this.getScores();
      }
    });


  }

  logout() {
    this.authService.logout();
    // Redirigez l'utilisateur vers la page de connexion ou d'accueil après la déconnexion
    this.router.navigate(['/login']);
  }

  getScores(): void {

    const tableauDeLignes = this.utilisateur!.scores.split('-');

    console.log(tableauDeLignes!);
    for (let score of tableauDeLignes!) {
      if(score != "") {
        this.scores.push({ quizz: score.split(':')[0], score: score.split(':')[1] });
      }
    }
    this.sortScores();

    for (let score of this.scores)
    {
      this.scoreCumule = this.scoreCumule + parseInt(score.score.split('/')[0]);
      console.log(this.scoreCumule);
    }
  }

  sortScores(): void {
    this.scores.sort((a, b) => {
      const scoreA = parseInt(a.score.split('/')[0]);
      const scoreB = parseInt(b.score.split('/')[0]);
      return scoreB - scoreA;
    });
  }


}
