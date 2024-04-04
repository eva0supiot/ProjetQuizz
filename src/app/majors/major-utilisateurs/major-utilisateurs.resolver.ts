import { inject } from "@angular/core"
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router"
import { MajorService } from "../../services/major.service"
import { Utilisateur } from "../../models/utilisateur.model"

export const MajorUtilisateursResolver: ResolveFn<Utilisateur[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(MajorService).findUtilisateursFromMajor(route.params["id"])
}
