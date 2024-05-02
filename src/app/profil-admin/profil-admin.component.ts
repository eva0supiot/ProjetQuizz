import { Component } from '@angular/core';
import { MatButton } from "@angular/material/button"
import { MatRadioButton, MatRadioChange, MatRadioGroup } from "@angular/material/radio"
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms"
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

  utilisateurs: Utilisateur [] = []
  quizzes: Quizz[] = [];
  questions: Question[] = [];

  nbQuestions: number = 0;

  userForm: FormGroup = new FormGroup({});
  quizzForm: FormGroup = new FormGroup({});



  constructor(private _route: ActivatedRoute, private utilisateurService: UtilisateurService, private quizzService: QuizzService, private questionService: QuestionService, private router: Router, private fb: FormBuilder, private fb2: FormBuilder, private _snackBar: MatSnackBar) {
    this.utilisateurService.findAll().subscribe((data) => this.utilisateurs = data)
    this.quizzService.findAll().subscribe((data) => this.quizzes = data)
    this.questionService.findAll().subscribe((data) => this.questions = data)
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

    this.quizzForm = this.fb2.group({
      titre: ['', Validators.required],
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
    } else {
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
    if (utilisateur.admin === true) {
      this._snackBar.open('Vous ne pouvez pas supprimer l\'admin', '', { duration: 5000 });
    } else {
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

  generateFields() {
    const inputElement = document.getElementById('nbQuestion') as HTMLInputElement;
    if (inputElement) {
      const numberOfQuestions = inputElement.value;
      const container = document.getElementById('questions-container');
      if (container) {
        container.innerHTML = ''; // Efface les champs précédents

        for (let i = 0; i < Number(numberOfQuestions); i++) {
          const questionDiv = document.createElement('div');
          questionDiv.className = 'question-block';

          const questionLabel = document.createElement('label');
          questionLabel.htmlFor = 'question' + (i + 1);
          questionLabel.innerText = 'Question ' + (i + 1) + ': ';

          const questionInput = document.createElement('input');
          questionInput.type = 'text';
          questionInput.id = 'question' + (i + 1);
          questionInput.name = 'question' + (i + 1);
          questionInput.placeholder = 'Entrez votre question ici';
          questionInput.required = true;

          questionDiv.appendChild(questionLabel);
          questionDiv.appendChild(questionInput);

          const responsesDiv = document.createElement('div');
          responsesDiv.className = 'responses-container';

          for (let j = 1; j <= 4; j++) {
            const reponseInput = document.createElement('input');
            reponseInput.type = 'text';
            reponseInput.id = 'reponse' + j + '-' + i;
            reponseInput.name = 'reponse' + j + '-' + i;
            reponseInput.placeholder = 'Entrez votre réponse ' + j;

            const radioButton = document.createElement('input');
            radioButton.type = 'radio';
            radioButton.name = 'correct-answer-' + i; // Même nom pour grouper les boutons radio
            radioButton.value = 'reponse' + j + '-' + i;

            responsesDiv.appendChild(reponseInput);
            responsesDiv.appendChild(radioButton);
          }

          questionDiv.appendChild(responsesDiv);
          container.appendChild(questionDiv);
          container.appendChild(document.createElement('br'));
        }
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Soumettre';
        submitButton.type = 'button'; // éviter la soumission automatique du formulaire
        submitButton.onclick = () => this.onSubmit(); // Appeler une méthode pour traiter les données
        container.appendChild(submitButton);
      }
    }
  }

  onSubmit() {
    //this._snackBar.open('question 1 :'+this.questions.length, 'Fermer', { duration: 5000 });
    if (this.quizzForm.valid) {
      //this._snackBar.open('question 1 :', 'Fermer', { duration: 5000 });
      console.log(this.quizzForm.value);
      const TitreExist = this.quizzes.some(quiz => quiz.titre === this.quizzForm.value.titre);
      //this._snackBar.open('question 1 :'+TitreExist, 'Fermer', { duration: 5000 });
      if(TitreExist)
      {
        //this._snackBar.open('question 1 :', 'Fermer', { duration: 5000 });

      }
      else{
        const newQuizz: Quizz = this.quizzForm.value;
        //this._snackBar.open('question 1 :', 'Fermer', { duration: 5000 });
        this.quizzService.add(newQuizz).subscribe(
          response => {
            this.quizzes.push(response);
            console.log('Quizz ajouté avec succès', response);
            //const quizId = response.id;
            //window.location.reload();
            this._snackBar.open('okokok1', 'Fermer', { duration: 5000 });
            this.addQuestions(response);  // Méthode dédiée pour ajouter des questions
          },
          error => {
            console.error('Erreur lors de l\'ajout du quizz', error);
            this._snackBar.open('Erreur lors de l\'ajout du quizz', '', { duration: 5000 });
          }
        );
      }
    } else {
      this._snackBar.open('Veuillez compléter le formulaire correctement.', 'Fermer', { duration: 5000 });
    }
  }

  addQuestions(quiz: Quizz) {
    this._snackBar.open('okokok0', 'Fermer', { duration: 5000 });
    const numberOfQuestions = parseInt((document.getElementById('nbQuestion') as HTMLInputElement).value);
    for (let i = 1; i <= numberOfQuestions; i++) {
      const questionValue = (document.getElementById('question' + i) as HTMLInputElement).value;
      const newQuestion: Question = {
        contenu: questionValue,
        quizz: quiz
      };


      this.questionService.add(newQuestion).subscribe(
        res => {
          //this._snackBar.open('okokok1', 'Fermer', { duration: 5000 });
          console.log('Question ajoutée avec succès', res)
        },
        err => {
          //this._snackBar.open('okokok2', 'Fermer', { duration: 5000 });
          console.error('Erreur lors de l\'ajout de la question', err)
        }
      );
    }
  }

  SupprimerQuizz(Quizz: any) {
    this.quizzes.forEach((quizz: Quizz) => {


    })
  }
}

