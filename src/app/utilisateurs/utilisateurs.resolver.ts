import { inject } from "@angular/core"
import { ResolveFn } from "@angular/router"
import { Utilisateur } from "models/utilisateur.model"
import { UtilisateurService } from "services/utilisateur.service"

export const UtilisateursResolver: ResolveFn<Utilisateur[]> = () => {
  return inject(UtilisateurService).findAll()
}
