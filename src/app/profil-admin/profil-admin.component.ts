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
import { Reponse } from "../models/reponse.model"
import { ReponseService } from "../services/reponse.service"

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

  utilisateurs: Utilisateur [] = []
  quizzes: Quizz[] = [];
  questions: Question[] = [];
  reponses: Reponse[] = [];


  userForm: FormGroup = new FormGroup({});
  quizzForm: FormGroup = new FormGroup({});

  currentQuiz: Quizz | null = null;
  currentQuestion : Question | null = null;



  constructor(private _route: ActivatedRoute, private utilisateurService: UtilisateurService, private quizzService: QuizzService, private questionService: QuestionService, private reponseService: ReponseService, private router: Router, private fb: FormBuilder, private fb2: FormBuilder, private _snackBar: MatSnackBar) {
    this.utilisateurService.findAll().subscribe((data) => this.utilisateurs = data)
    this.quizzService.findAll().subscribe((data) => this.quizzes = data)
    this.questionService.findAll().subscribe((data) => this.questions = data)
    this.initForm();

  }

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
            reponseInput.id = 'reponse' + j + '-' + (i + 1);
            reponseInput.name = 'reponse' + j + '-' + (i + 1);
            reponseInput.placeholder = 'Entrez votre réponse ' + j;

            const radioButton = document.createElement('input');
            radioButton.type = 'radio';
            radioButton.id = 'correct-answer-' + j + '-' + (i+1);
            radioButton.name = 'correct-answer-' +(i + 1); // Même nom pour grouper les boutons radio
            radioButton.value = 'reponse' + j + '-' + (i + 1);

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
    if (this.quizzForm.valid) {
      console.log(this.quizzForm.value);
      const TitreExist = this.quizzes.some(quiz => quiz.titre === this.quizzForm.value.titre);
      if (TitreExist) {
        // Traitement en cas de titre existant
      } else {
        const newQuizz: Quizz = this.quizzForm.value;
        this.quizzService.add(newQuizz).subscribe(
          response => {
            console.log('Quizz ajouté avec succès', response);
            this.currentQuiz = response;
            this.processQuestions(this.currentQuiz).then(() => {
              console.log('Toutes les questions et réponses ont été ajoutées.');
            }).catch(err => {
              console.error('Erreur lors de l\'ajout des questions et réponses', err);
            });
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

  processQuestions(quiz: Quizz, index = 1) {
    return new Promise<void>((resolve, reject) => {
      this.addQuestions(quiz, index).then(() => {
        if (index < Number((document.getElementById('nbQuestion') as HTMLInputElement).value)) {
          this.processQuestions(quiz, index + 1).then(() => {
            resolve();
          }).catch(err => {
            reject(err);
          });
        } else {
          resolve();
        }
      }).catch(err => {
        reject(err);
      });
    });
  }

  addQuestions(quiz: Quizz, index: number) {
    return new Promise<void>((resolve, reject) => {
      const questionValue = (document.getElementById('question' + index) as HTMLInputElement).value;
      const newQuestion: Question = {
        contenu: questionValue,
        image: null,
        quizz: quiz,
      };

      this.questionService.add(newQuestion).subscribe(
        response => {
          console.log('Question ajoutée avec succès', response);
          this.currentQuestion = response;
          this.addReponses(this.currentQuestion, index).then(() => {
            resolve();
          });
        },
        err => {
          console.error('Erreur lors de l\'ajout de la question', err);
          reject(err);
        }
      );
    });
  }


  addReponses(question: Question, nbQuestion : number) {
    return new Promise<void>((resolve, reject) => {
    if (question) {

      for (let i = 1; i <= 4; i++) {
        if ((document.getElementById('reponse' + i +"-"+nbQuestion) as HTMLInputElement).value != "") {
          let reponseValue = (document.getElementById('reponse' + i +"-"+nbQuestion) as HTMLInputElement).value;
          let newReponse: Reponse
          newReponse = {
            contenu: reponseValue,
            solution: (document.getElementById('correct-answer-' + i + '-' + nbQuestion) as HTMLInputElement).checked,
            question: question,
          }

          this.reponseService.add(newReponse).subscribe(
            res => {
              console.log('Reponse ajoutée avec succès', res)
              resolve();
            },
            err => {
              console.error('Erreur lors de l\'ajout de la reponse', err)
              reject(err);
            }
          );
        }
      }
    }
    });
  }

  /*async pause(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }*/

  SupprimerQuizz(quiz: Quizz) {
      this.questions.forEach((question: Question) => {
        if(quiz.id === question.quizz.id)
        {
          this.reponses.forEach((rep: Reponse) => {
            if(question.id === rep.question.id)
            {
              this.reponseService.delete(rep).subscribe(
                response => {
                  this.reponses = this.reponses.filter(r => r.id !== rep.id);
                  console.log('Réponse supprimé avec succès', response);
                },
                error => {
                  console.error('Erreur lors de la suppression de la reponse', error);
                }
              );
            }

          })
          this.questionService.delete(question).subscribe(
            response => {
              this.questions = this.questions.filter(ques => ques.id !== question.id);
              console.log('Question supprimé avec succès', response);
            },
            error => {
              console.error('Erreur lors de la suppression de la question', error);
            }
          );
        }


      })
    this.quizzService.delete(quiz).subscribe(
      response => {
        this.quizzes = this.quizzes.filter(q => q.id !== quiz.id);
        this._snackBar.open('Quiz supprimé', 'Fermer', { duration: 5000 });

        console.log('Quiz supprimé avec succès', response);
      },
      error => {
        console.error('Erreur lors de la suppression du Quiz', error);
      }
    );
  }
}

