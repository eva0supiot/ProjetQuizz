import { Component, OnInit } from "@angular/core"
import { ReponseAuQuizzService } from "../services/reponse-au-quizz.service"
import { CommonModule } from "@angular/common"
import { Question } from "models/question.model"
import { QuestionService } from "../services/question.service"
import { Reponse } from "models/reponse.model"
import { ReponseService } from "../services/reponse.service"
import { Quizz } from "../models/quizz.model"
import { Observable } from "rxjs"
import { ActivatedRoute } from "@angular/router"
import { Utilisateur } from "../models/utilisateur.model"
import { UtilisateurService } from "../services/utilisateur.service"

@Component({
  selector: 'validation-quizz',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './validation-quizz.component.html',
  styleUrl: './validation-quizz.component.scss'
})
export class ValidationQuizzComponent implements OnInit {
  quizz: Quizz | undefined

  questions$: Observable<Question[]> = this.questionService.findAll();
  questions: Question[] = [];

  reponses$: Observable<Reponse[]> = this.reponseService.findAll();
  reponses: Reponse[] = [];

  receivedData: any;

  idUtilisateur : number | undefined ;
  scoreAjoute : string = "";

  utilisateurs$: Observable<Utilisateur[]> = this.utilisateurService.findAll();
  utilisateurs : Utilisateur [] = [];

  constructor(private ReponseauquizzService: ReponseAuQuizzService,private questionService : QuestionService, private reponseService : ReponseService,route: ActivatedRoute,private utilisateurService: UtilisateurService) {
    this.questionService.findAll().subscribe((data)=> this.questions = data)
    this.utilisateurService.findAll().subscribe((data)=> this.utilisateurs = data)
    this.reponseService.findAll().subscribe((data)=> {
      this.reponses = data;
      this.reponses.forEach(rep => {
      });
    });
    this.idUtilisateur = 1;

  }

  ngOnInit(): void {
    this.receivedData = this.ReponseauquizzService.getData();

    if (this.receivedData && typeof this.receivedData.score !== 'undefined') {
      this.scoreAjoute = this.receivedData.quizz +":"+ this.receivedData.score;
    } else {
      this.scoreAjoute = "";
    }

    this.idUtilisateur = 1;

    this.utilisateurService.saveScore(this.idUtilisateur!,this.scoreAjoute).subscribe(
      response => {
        console.log('Score mis à jour avec succès :', response);
        // Gérez la réponse ou effectuez d'autres actions nécessaires après la mise à jour du score
      },
      error => {
        console.error('Erreur lors de la mise à jour du score :', error);
        // Gérez l'erreur ou affichez un message d'erreur à l'utilisateur
      }
    );
  }


}
