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

  constructor(private ReponseauquizzService: ReponseAuQuizzService,private questionService : QuestionService, private reponseService : ReponseService,route: ActivatedRoute) {
    this.questionService.findAll().subscribe((data)=> this.questions = data)
    this.reponseService.findAll().subscribe((data)=> {
      this.reponses = data;
      this.reponses.forEach(rep => {
      });
    });
  }

  ngOnInit(): void {
    this.receivedData = this.ReponseauquizzService.getData();

  }
}
