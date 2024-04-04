import { Component, OnInit } from "@angular/core"
import { map, Observable } from "rxjs"
import { ActivatedRoute } from "@angular/router"
import { Utilisateur } from "../../models/utilisateur.model"

@Component({
  selector: "major-utilisateurs",
  templateUrl: "./major-utilisateurs.component.html",
  styleUrls: ["./major-utilisateurs.component.scss"],
})
export class MajorUtilisateursComponent implements OnInit {
  utilisateursFromMajor$: Observable<Utilisateur[]> = this._route.data.pipe(map((data) => data["utilisateursFromMajor"]))

  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {}
}
