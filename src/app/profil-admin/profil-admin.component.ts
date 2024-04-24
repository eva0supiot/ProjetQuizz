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

  userForm: FormGroup = new FormGroup({});

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
    this.initForm();

  }


  // il existe deux facons de faire des formulaires en angular : ici les reactives forms (sinon c'est ngForm)
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    imageName: new FormControl('', Validators.required)
  });

  initForm() {
    this.userForm = this.fb.group({
      pseudo: ['', Validators.required],
      mdp: ['', Validators.required],
      admin: [false, Validators.required],
      scores: ['0', Validators.required],
      pdp: [null]
    });
  }

  onRadioButtonChange($event: MatRadioChange) {
    console.log($event.value);
  }

  AjouterUser() {

    //this._snackBar.open('INfo :'+this.userForm.value.pseudo+this.userForm.value.mdp, '', { duration: 5000 });
    const pseudoExist = this.utilisateurs.some(user => user.pseudo === this.userForm.value.pseudo);
    if (pseudoExist) {
      this._snackBar.open('L\'utilisateur existe déjà', '', { duration: 5000 });
      return;
    }
    else {
      const newUser: Utilisateur = this.userForm.value;

      this.utilisateurService.add(newUser).subscribe(
        response => {
          this._snackBar.open('Utilisateur ajouté avec succès', '', { duration: 5000 });
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


  SupprimerUser(utilisateur: Utilisateur) {
      if(utilisateur.pseudo === 'noriane')
      {
        this._snackBar.open('Vous ne pouvez pas supprimer l\'admin', '', { duration: 5000 });
      }
      else{
        if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
          this.utilisateurService.delete(utilisateur).subscribe(
            response => {
              this.utilisateurs = this.utilisateurs.filter(u => u.id !== utilisateur.id);
              this._snackBar.open('Utilisateur supprimé avec succès', '', { duration: 5000 });
              console.log('Utilisateur supprimé avec succès', response);
            },
            error => {
              this._snackBar.open('Erreur lors de la suppression de l\'utilisateur', '', { duration: 5000 });
              console.error('Erreur lors de la suppression de l\'utilisateur', error);
            }
          );
        }
      }
  }

  SupprimerQuizz(Quizz: any) {
    this.quizzes.forEach((quizz: Quizz) => {


    })
  }
}

