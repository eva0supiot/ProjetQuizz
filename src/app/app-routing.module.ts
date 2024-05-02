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
import { QuizzComponent } from "./quizz/quizz.component"
import { ProfilAdminComponent } from "profil-admin/profil-admin.component"
import { ValidationQuizzComponent } from "validation-quizz/validation-quizz.component"
import { AuthGuard } from "./services/auth.guard"
import { from } from "rxjs"


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "", redirectTo: '/quizz/:id', pathMatch: 'full'},
  { path: "quizz/:id", component: QuizzComponent},
  { path: "validation-quizz", component: ValidationQuizzComponent},
  { path: "login", component: LoginComponent},
  { path: "inscription", component: InscriptionComponent},
  { path: "profil", component: ProfilComponent, canActivate: [AuthGuard] },
  { path: "profil-admin", component: ProfilAdminComponent, canActivate: [AuthGuard] },
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
