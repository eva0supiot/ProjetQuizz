import { Component } from '@angular/core';
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

@Component({
  selector: 'quizz',
  standalone: true,
  imports: [
    RouterLink,
    MatCheckbox,
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

  constructor(private quizzService: QuizzService, route: ActivatedRoute,private questionService : QuestionService, private reponseService : ReponseService , private router: Router, private ReponseauquizzService: ReponseAuQuizzService
  ) {
    quizzService.findById(route.snapshot.params["id"]).subscribe((quizz) => this.quizz = quizz)
    this.questionService.findAll().subscribe((data)=> this.questions = data)
    this.reponseService.findAll().subscribe((data)=> this.reponses = data)
  }

  sendData() {
    const dataToSend = { name: 'test' };
    this.ReponseauquizzService.setData(dataToSend);
    this.router.navigate(['/validation-quizz']); // Rediriger vers la deuxième page
  }

}
