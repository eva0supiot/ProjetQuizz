import { Component,OnInit } from '@angular/core';
import { Quizz } from "../models/quizz.model"
import { QuizzService } from "../services/quizz.service"
import { ActivatedRoute, ActivatedRouteSnapshot, RouterLink } from "@angular/router"
import { Observable } from "rxjs"
import { MatCheckbox } from "@angular/material/checkbox"
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UtilisateurService } from '../services/utilisateur.service';
import { Utilisateur } from 'models/utilisateur.model';
import { NgModule } from '@angular/core';

@Component({
  selector: 'scores-quizz',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './scores-quizz.component.html',
  styleUrl: './scores-quizz.component.scss'
})
export class ScoresQuizzComponent {

  utilisateurs: Utilisateur[] = [];

  quizz: Quizz | undefined

  scores: { pseudo: string; score: string; }[] = [];

  constructor(
    private quizzService: QuizzService,
    private utilisateurService: UtilisateurService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getQuizz();
    this.getUtilisateurs();
  }

  getQuizz(): void {
    const id = this.route.snapshot.params["id"];
    this.quizzService.findById(id).subscribe((quizz) => {
      this.quizz = quizz;
      this.getAllScores();
    });
  }

  getUtilisateurs(): void {
    this.utilisateurService.findAll().subscribe((utilisateurs) => {
      this.utilisateurs = utilisateurs;
      this.getAllScores();
    });
  }

  getAllScores(): void {
    if (this.quizz && this.utilisateurs.length > 0) {
      for (let utilisateur of this.utilisateurs) {
        const tableauDeLignes = utilisateur.scores.split('-');
        for (let score of tableauDeLignes) {
          if (score.split(':')[0] === this.quizz!.id!.toString()) {
            this.scores.push({ pseudo: utilisateur.pseudo, score: score.split(':')[1] });
          }
        }
      }
      this.sortScores();
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
