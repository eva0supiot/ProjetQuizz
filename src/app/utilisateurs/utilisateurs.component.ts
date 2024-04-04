import { Component } from "@angular/core"
import { map, Observable } from "rxjs"
import { Utilisateur } from "models/utilisateur.model"
import { ActivatedRoute, Router } from "@angular/router"
import { UtilisateurService } from "services/utilisateur.service"

@Component({
  selector: "utilisateurs",
  templateUrl: "./utilisateurs.component.html",
  styleUrls: ["./utilisateurs.component.scss"],
})
export class UtilisateursComponent {
  utilisateurs$: Observable<Utilisateur[]> = this._route.data.pipe(map((data) => data["utilisateurs"]))

  constructor(private _route: ActivatedRoute, private utilisateurService: UtilisateurService, private router: Router) {}

  deleteUtilisateur(event: any, utilisateur: Utilisateur) {
    event.stopPropagation()
    this.utilisateurService.delete(utilisateur).subscribe(() => this.router.navigate(["utilisateurs"]))
  }

  searchByMajorAndCourse($event: Observable<Utilisateur[]>) {
    this.utilisateurs$ = $event
  }
}
