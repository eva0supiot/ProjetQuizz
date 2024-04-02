import { Component, OnInit } from "@angular/core"
import { Student } from "models/student.model"
import { map, Observable } from "rxjs"
import { ActivatedRoute, Router } from "@angular/router"
import { StudentService } from "../services/student.service"

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  students$: Observable<Student[]> = this._route.data.pipe(map((data) => data["students"]))

  constructor(private _route: ActivatedRoute, private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {}
}
