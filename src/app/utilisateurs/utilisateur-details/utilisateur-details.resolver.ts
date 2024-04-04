import { inject } from "@angular/core"
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router"
import { Observable } from "rxjs"
import { UtilisateurService } from "services/utilisateur.service"
import { Utilisateur } from "models/utilisateur.model"

export const UtilisateurDetailsResolver: ResolveFn<Utilisateur> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  if (route.params["id"] == "new") {
    return new Observable((observer) => {
      observer.next({
        pseudo: "", mdp: "", admin: false, scores: ""}) //???
    })
  }
  return inject(UtilisateurService).findById(parseInt(route.params["id"], 10))
}
