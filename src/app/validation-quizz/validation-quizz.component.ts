import { Component, OnInit } from "@angular/core"
import { ReponseAuQuizzService } from "../services/reponse-au-quizz.service"

@Component({
  selector: 'validation-quizz',
  standalone: true,
  imports: [],
  templateUrl: './validation-quizz.component.html',
  styleUrl: './validation-quizz.component.scss'
})
export class ValidationQuizzComponent implements OnInit {
  receivedData: any;

  constructor(private ReponseauquizzService: ReponseAuQuizzService) { }

  ngOnInit(): void {
    this.receivedData = this.ReponseauquizzService.getData();
  }
}
