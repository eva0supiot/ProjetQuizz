import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { HomeComponent } from "home/home.component"
import { UtilisateursComponent } from "utilisateurs/utilisateurs.component"
import { UtilisateursResolver } from "utilisateurs/utilisateurs.resolver"
import { UtilisateurDetailsComponent } from "utilisateurs/utilisateur-details/utilisateur-details.component"
import { UtilisateurDetailsResolver } from "utilisateurs/utilisateur-details/utilisateur-details.resolver"
import { MajorsComponent } from "majors/majors.component"
import { MajorsResolver } from "majors/majors.resolver"
import { MajorUtilisateursResolver } from "majors/major-utilisateurs/major-utilisateurs.resolver"
import { MajorUtilisateursComponent } from "majors/major-utilisateurs/major-utilisateurs.component"
import { LoginComponent } from "login/login.component"
import { InscriptionComponent } from "inscription/inscription.component"
import { ProfilComponent } from "profil/profil.component"

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "inscription", component: InscriptionComponent },
  { path: "profil", component: ProfilComponent },
  {
    path: "etudiants",
    component: UtilisateursComponent,
    resolve: {
      utilisateurs: UtilisateursResolver,
    },
  },
  {
    path: "details-etudiant/:id",
    component: UtilisateurDetailsComponent,
    resolve: {
      utilisateur: UtilisateurDetailsResolver,
    },
  },
  {
    path: "filieres",
    component: MajorsComponent,
    resolve: {
      majors: MajorsResolver,
    },
  },

  {
    path: "etudiants-filiere/:id",
    component: MajorUtilisateursComponent,
    resolve: {
      utilisateursFromMajor: MajorUtilisateursResolver,
    },
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
