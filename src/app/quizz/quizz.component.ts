import { Component, NgModule } from "@angular/core"
import { Quizz } from "../models/quizz.model"
import { QuizzService } from "../services/quizz.service"
import { ActivatedRoute, ActivatedRouteSnapshot, RouterLink } from "@angular/router"
import { Question } from "models/question.model"
import { QuestionService } from "../services/question.service"
import { Reponse } from "models/reponse.model"
import { ReponseService } from "../services/reponse.service"
import { Observable } from "rxjs"
import { MatCheckbox } from "@angular/material/checkbox"
import { ReponseAuQuizzService } from "../services/reponse-au-quizz.service"
import { Router } from '@angular/router';
import { FormsModule } from "@angular/forms"
import { CommonModule } from '@angular/common';

@Component({
  selector: 'quizz',
  standalone: true,
  imports: [
    RouterLink,
    MatCheckbox,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.scss'
})

export class QuizzComponent {
  quizz: Quizz | undefined

  questions$: Observable<Question[]> = this.questionService.findAll();
  questions: Question[] = [];

  reponses$: Observable<Reponse[]> = this.reponseService.findAll();
  reponses: Reponse[] = [];

  reponsesJoueurs : { selected: boolean, idquestion: number|undefined }[] = [];
  solutionsQuizz : { selected: boolean, idquestion: number|undefined }[] = [];

  score : string | undefined = "" ;

  constructor(private quizzService: QuizzService, route: ActivatedRoute,private questionService : QuestionService, private reponseService : ReponseService , private router: Router, private ReponseauquizzService: ReponseAuQuizzService
  ) {
    this.questionService.findAll().subscribe((data)=> {
      const idquizz = this.quizz ? this.quizz.id : 0;
      this.questions = data.filter(question => question.quizz.id == idquizz);
    })

    quizzService.findById(route.snapshot.params["id"]).subscribe((quizz) => {

      this.quizz = quizz;

      if (this.quizz && this.quizz.id != null) {

        this.reponseService.findAll().subscribe((data)=> {

          const idquizz = this.quizz ? this.quizz.id : 0;

          this.reponses = data.filter(response => response.question.quizz.id == idquizz);

          let i = 0;

          this.reponses.forEach(rep => {

            this.reponsesJoueurs.push({ selected: false, idquestion: rep.question.id });
            this.solutionsQuizz.push({ selected: rep.solution, idquestion: rep.question.id });

            i=i+1;
          });
        });
      }
    });
  }

  nombrequestion: { idquestions : number, score : number }[] = [];

  Compared():string {

    for (let i = 0; i < this.questions.length; i++) {
      this.nombrequestion.push({ score: 1, idquestions: this.questions[i].id! });
    }

    console.log("nombrequestion    " +this.nombrequestion);

    for (let i = 0; i < this.reponsesJoueurs.length; i++) {

      if (this.reponsesJoueurs[i].selected !== this.solutionsQuizz[i].selected) {

        this.nombrequestion.forEach(element => {
          if (element.idquestions === this.reponsesJoueurs[i].idquestion) {
            element.score = 0;
          }
        });
      }
    }

    console.log("nombrequestion    " +this.nombrequestion);

    const somme: number = this.nombrequestion.reduce((total, score) => total + score.score, 0);

    console.log("score  " + somme+ "/"+(this.questions.length));

    return somme+ "/"+(this.questions.length);
  }

  sendData() {
    const quizzId = this.quizz ? this.quizz.id : null;

    this.score = this.Compared();

    const selectedData = { selectedResponses: this.reponsesJoueurs,
      quizz: quizzId,
      score : this.score };

    this.ReponseauquizzService.setData(selectedData);
    this.router.navigate(['/validation-quizz']); // Rediriger vers la deuxième page
  }

  protected readonly Object = Object

}
