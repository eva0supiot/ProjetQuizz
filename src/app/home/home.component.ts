import { Component, OnInit } from "@angular/core"
import { map, Observable } from "rxjs"
import { ActivatedRoute, Router } from "@angular/router"
import { Quizz } from "models/quizz.model"
import { Question } from "models/question.model"
import { QuizzService } from "../services/quizz.service"
import { QuestionService } from "../services/question.service"

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})

export class HomeComponent implements OnInit {
  quizzes$: Observable<Quizz[]> = this.quizzService.findAll();
  questions$: Observable<Question[]> = this.questionService.findAll();

  quizzes: Quizz[] = [];
  questions: Question[] = [];

  constructor(private _route: ActivatedRoute, private quizzService: QuizzService,private questionService: QuestionService, private router: Router) {
    this.quizzService.findAll().subscribe((data)=> this.quizzes = data)
    this.questionService.findAll().subscribe((data)=> this.questions = data)

  }
  ngOnInit(): void {}
}
