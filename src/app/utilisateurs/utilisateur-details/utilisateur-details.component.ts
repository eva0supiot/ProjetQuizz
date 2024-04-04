import { Component } from "@angular/core"
import { map, Observable } from "rxjs"
import { Utilisateur } from "models/utilisateur.model"
import { ActivatedRoute, Router } from "@angular/router"
import { Course } from "models/course.model"
import { CourseService } from "services/course.service"
import { UtilisateurService } from "services/utilisateur.service"
import { Major } from "../../models/major.model"
import { MajorService } from "../../services/major.service"

@Component({
  selector: "utilisateur-details",
  templateUrl: "./utilisateur-details.component.html",
  styleUrls: ["./utilisateur-details.component.scss"],
})
export class UtilisateurDetailsComponent {
  utilisateur$: Observable<Utilisateur> = this._route.data.pipe(map((data) => data["utilisateur"]))
  allMajors$: Observable<Major[]> | undefined
  allCourses$: Observable<Course[]> | undefined
  majorSelectModel: Major | null = null
  courseSelectModel: Course | null = null
  notSelectedCourse: boolean | undefined
  today = new Date(Date.now())

  constructor(
    private _route: ActivatedRoute,
    private courseService: CourseService,
    private utilisateurService: UtilisateurService,
    private majorService: MajorService,
    private router: Router,
  ) {
    this.allMajors$ = this.majorService.findAll()
  }

  courseClick() {
    this.allCourses$ = this.courseService.findAll()
  }

  /*addCourseToUtilisateur(utilisateur: Utilisateur) {
    if (this.courseSelectModel != null) {
      this.utilisateurService.addCourseToUtilisateur(utilisateur, this.courseSelectModel)
    } else {
      this.notSelectedCourse = true
    }
  }*/

  /*removeCourseToUtilisateur(utilisateur: Utilisateur, course: Course) {
    this.utilisateurService.removeCourseToUtilisateur(utilisateur, course)
  }*/

  save(utilisateur: Utilisateur) {
    const id = this._route.snapshot.params["id"]

    /*if (this.majorSelectModel !== null) {
      utilisateur.major = this.majorSelectModel
    }*/

    if (id == "new") {
      this.utilisateurService.create(utilisateur).subscribe(() => {
        this.router.navigate(["utilisateurs"])
      })
    } else {
      this.utilisateurService.update(id, utilisateur).subscribe(() => {
        this.router.navigate(["utilisateurs"])
      })
    }
  }
}
