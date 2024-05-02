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

  selectedResponses: { [key: string]: { selected: boolean, numero: number|undefined } } = {};

  comparedtoData: { [key: string]: { selected: boolean, numero: number|undefined } } = {};

  score : string = "" ;

  trackByFn(index: number, reponses: any): number {
    return reponses.id;
  }

  constructor(private quizzService: QuizzService, route: ActivatedRoute,private questionService : QuestionService, private reponseService : ReponseService , private router: Router, private ReponseauquizzService: ReponseAuQuizzService
  ) {
    this.questionService.findAll().subscribe((data)=> this.questions = data)
    quizzService.findById(route.snapshot.params["id"]).subscribe((quizz) => { this.quizz = quizz;
      if (this.quizz && this.quizz.id != null) {
        this.reponseService.findAll().subscribe((data)=> {

          const idquizz = this.quizz ? this.quizz.id : 0;

          this.reponses = data.filter(response => response.question.quizz.id === idquizz);
          // Initialisation des données du tableau une fois que les réponses sont chargées
          this.reponses.forEach(rep => {/*
            this.selectedResponses[rep.id] = { selected: false, numero : rep.question.id };
            this.comparedtoData[rep.id] = { selected: rep.solution, numero: rep.question.id};
*/
          });
        });
      }
    });
  }


  Compared():string {
    const liste = Object.values(this.comparedtoData);
    const liste2 = Object.values(this.selectedResponses as { [key: string]: { selected: boolean, numero: number } });

    const nombrequestion: number[] = Array.from({ length: liste[liste.length - 1].numero! }, () => 1);

    for (const key in liste) {
      if (liste[key].selected !== liste2[key].selected) {
        nombrequestion[liste[key].numero!] = 0;
      }
    }

    const somme: number = nombrequestion.reduce((total, nombre) => total + nombre, 0);

    return somme+ "/"+nombrequestion.length;
  }

  ngOnInit(): void {
  }

  sendData() {
    const quizzId = this.quizz ? this.quizz.id : null;

    this.score = this.Compared();

    const selectedData = { selectedResponses: Object.values(this.selectedResponses),
      quizzId: quizzId,
      score : this.score };

    this.ReponseauquizzService.setData(selectedData);
    this.router.navigate(['/validation-quizz']); // Rediriger vers la deuxième page
  }

  protected readonly Object = Object

}
