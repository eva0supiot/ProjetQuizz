import { Component, OnInit } from "@angular/core"
import { Utilisateur } from "models/utilisateur.model"
import { map, Observable } from "rxjs"
import { ActivatedRoute, Router } from "@angular/router"
import { UtilisateurService } from "../services/utilisateur.service"

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  utilisateurs$: Observable<Utilisateur[]> = this._route.data.pipe(map((data) => data["utilisateurs"]))

  constructor(private _route: ActivatedRoute, private utilisateurService: UtilisateurService, private router: Router) {}

  ngOnInit(): void {}
}
