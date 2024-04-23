import { Component } from '@angular/core';
import { MatButton } from "@angular/material/button"
import { MatRadioButton, MatRadioChange, MatRadioGroup } from "@angular/material/radio"
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms"
import { Observable, of } from "rxjs"
import { User } from "../inscription/inscription.component"
import { Quizz } from "../models/quizz.model"
import { Question } from "../models/question.model"
import { ActivatedRoute, Router } from "@angular/router"
import { QuizzService } from "../services/quizz.service"
import { QuestionService } from "../services/question.service"
import { Utilisateur } from "../models/utilisateur.model"
import { UtilisateurService } from "../services/utilisateur.service"
import { MatSnackBar } from "@angular/material/snack-bar"


@Component({
  selector: 'profil-admin',
  standalone: true,
  imports: [
    MatButton,
    MatRadioButton,
    MatRadioGroup,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './profil-admin.component.html',
  styleUrl: './profil-admin.component.scss'
})
export class ProfilAdminComponent {
  quizzes$: Observable<Quizz[]> = this.quizzService.findAll();
  questions$: Observable<Question[]> = this.questionService.findAll();
  utilisateurs$: Observable<Utilisateur[]> = this.utilisateurService.findAll();

  utilisateurs : Utilisateur [] = []
  quizzes: Quizz[] = [];
  questions: Question[] = [];

  user1: Utilisateur = {
    pseudo: '',
    mdp: '',
    admin: false,
    scores: '',
    pdp: null
  };

  constructor(private _route: ActivatedRoute,private utilisateurService: UtilisateurService, private quizzService: QuizzService,private questionService: QuestionService, private router: Router, private fb: FormBuilder, private _snackBar: MatSnackBar) {
    this.utilisateurService.findAll().subscribe((data)=> this.utilisateurs = data)
    this.quizzService.findAll().subscribe((data)=> this.quizzes = data)
    this.questionService.findAll().subscribe((data)=> this.questions = data)

  }


  // il existe deux facons de faire des formulaires en angular : ici les reactives forms (sinon c'est ngForm)
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    imageName: new FormControl('', Validators.required)
  });

  onRadioButtonChange($event: MatRadioChange) {
    console.log($event.value);
  }

  AjouterUser() {
    this.utilisateurService.add(this.user1).subscribe(
      response => {

        console.log('Utilisateur ajouté avec succès', response);
        this.user1 = {
          pseudo: '',
          mdp: '',
          admin: false,
          scores: '',
          pdp: null
        };
        // Traitez la réponse ici, par exemple, affichez un message de succès à l'utilisateur
      },
      error => {
        this._snackBar.open("Rseultat :"+this.user1.mdp+this.user1.pseudo+"okok", '', {duration: 5000} )

        console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
        // Traitez l'erreur ici, par exemple, affichez un message d'erreur à l'utilisateur
      }
    );
  }

  SupprimerUser(Utilisateur: any) {
    this.utilisateurs.forEach((user: Utilisateur) => {


    })
  }

  SupprimerQuizz(Quizz: any) {
    this.quizzes.forEach((quizz: Quizz) => {


    })
  }
}

