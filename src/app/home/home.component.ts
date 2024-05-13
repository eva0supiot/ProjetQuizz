import { Component, OnInit } from "@angular/core"
import { map, Observable } from "rxjs"
import { ActivatedRoute, Router } from "@angular/router"
import { Quizz } from "models/quizz.model"
import { Question } from "models/question.model"
import { QuizzService } from "../services/quizz.service"
import { QuestionService } from "../services/question.service"
import { AuthService } from "../services/auth.service"

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

  constructor(private _route: ActivatedRoute, private quizzService: QuizzService,private questionService: QuestionService, private router: Router,private authService: AuthService) {
    this.quizzService.findAll().subscribe((data)=> this.quizzes = data)
    this.questionService.findAll().subscribe((data)=> this.questions = data)

  }

  playQuizz(quizzId: bigint | undefined): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([`/quizz/${quizzId}`]);
    } else {
      this.router.navigate(['/login']);
    }
  }
  ngOnInit(): void {}


}
