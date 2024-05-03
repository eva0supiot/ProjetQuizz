import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router"
import {Observable, of} from "rxjs";
import {MatRadioButton, MatRadioChange, MatRadioGroup} from "@angular/material/radio";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardHeader, MatCardSmImage, MatCardTitle, MatCardTitleGroup} from "@angular/material/card";
import { Utilisateur } from "../models/utilisateur.model"
import { UtilisateurService } from "../services/utilisateur.service"
import { QuizzService } from "../services/quizz.service"
import { QuestionService } from "../services/question.service"
import { MatSnackBar } from "@angular/material/snack-bar"
import { AuthService } from "../services/auth.service"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatRadioGroup, MatRadioButton, ReactiveFormsModule, MatButton, MatCard, MatCardHeader, MatCardTitleGroup, MatCardTitle, MatCardSmImage],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent {
  utilisateurs: Utilisateur [] = []

  userForm: FormGroup = new FormGroup({});

  // il existe deux facons de faire des formulaires en angular : ici les reactives forms (sinon c'est ngForm)
  initForm() {
    this.userForm = this.fb.group({
      pseudo: ['', Validators.required],
      mdp: ['', Validators.required],
      admin: [false, Validators.required],
      scores: ['0', Validators.required],
      pdp: [null]
    });
  }



  constructor(private _route: ActivatedRoute, private utilisateurService: UtilisateurService, private router: Router, private fb: FormBuilder, private _snackBar: MatSnackBar,private authService: AuthService) {
    this.utilisateurService.findAll().subscribe((data) => this.utilisateurs = data)
    this.initForm();

  }




  // cette méthode n'est pas obligatoire c'est pour montrer comment récupérer la valeur d'un radio button
  onRadioButtonChange($event: MatRadioChange) {
    console.log($event.value);
  }


  // lorsque je soumets mon formulaire
  onSubmit() {
    const pseudoExist = this.utilisateurs.some(user => user.pseudo === this.userForm.value.pseudo);
    if (pseudoExist) {
      this._snackBar.open('L\'utilisateur existe déjà', '', { duration: 5000 });
      return;
    } else {
      const newUser: Utilisateur = this.userForm.value;

      this.utilisateurService.add(newUser).subscribe(
        response => {
          this._snackBar.open('Utilisateur ajouté avec succès', '', { duration: 5000 });
          this.authService.login(newUser);
          this.router.navigate([newUser.admin ? 'profil-admin' : 'profil'], { queryParams: { username: newUser.pseudo } });
          console.log('Utilisateur ajouté avec succès', response);
          this.userForm.reset();
        },
        error => {
          this._snackBar.open('Erreur lors de l\'ajout de l\'utilisateur', '', { duration: 5000 });
          console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
        }
      );
    }
  }
}


// a mettre dans un autre fichier
export interface User {
  id: string,
  imageName : string
}
