import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router"
import {Observable, of} from "rxjs";
import {MatRadioButton, MatRadioChange, MatRadioGroup} from "@angular/material/radio";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardHeader, MatCardSmImage, MatCardTitle, MatCardTitleGroup} from "@angular/material/card";
import { Utilisateur } from "../models/utilisateur.model"
import { QuizzService } from "../services/quizz.service"
import { UtilisateurService } from "../services/utilisateur.service"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatRadioGroup, MatRadioButton, ReactiveFormsModule, MatButton, MatCard, MatCardHeader, MatCardTitleGroup, MatCardTitle, MatCardSmImage],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {
  utilisateurs$: Observable<Utilisateur[]> = this.utilisateurService.findAll();
  utilisateurs : Utilisateur [] = [];


  // il existe deux facons de faire des formulaires en angular : ici les reactives forms (sinon c'est ngForm)
  /* myForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    mdp: new FormControl('', [Validators.required]),
    score: new FormControl('', [Validators.required]),
    imageName: new FormControl('', Validators.required)
  });*/

  constructor(private _route: ActivatedRoute, private utilisateurService: UtilisateurService, private router: Router) {
    this.utilisateurService.findAll().subscribe((data)=> this.utilisateurs = data)

  }
/*
  // cette méthode mock le post au back
  postUser(user : User) {
    this.users.push(user);
  }

  // cette méthode sert à faire comme si j'appelais mon API et qu'elle me retournais deux utilisateurs
  mockUserData() : Observable<User[]> {
    // @ts-ignore
    const users : User[] = [{name: "Dorian", mdp: "123456", score: "15", imageName: "PhotoProfil1"}]
    return of(users)
  }
}


// a mettre dans un autre fichier
export interface User {
  name: string,
  mdp: string,
  score: string,
  imageName : string
}*/
  ngOnInit(): void {}
}
