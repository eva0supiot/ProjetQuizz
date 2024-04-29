import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppRoutingModule } from "app-routing.module"
import { AppComponent } from "app.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { NavbarComponent } from "navbar/navbar.component"
import { MatListModule } from "@angular/material/list"
import { HomeComponent } from "home/home.component"

import { FormsModule } from "@angular/forms"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { MajorsComponent } from "majors/majors.component"
import { MajorUtilisateursComponent } from "majors/major-utilisateurs/major-utilisateurs.component"
import { HttpClientModule } from "@angular/common/http"
import { UtilisateursComponent } from "./utilisateurs/utilisateurs.component"
import { UtilisateurDetailsComponent } from "./utilisateurs/utilisateur-details/utilisateur-details.component"
import { CommonModule } from "@angular/common"
import { QuizzComponent } from "./quizz/quizz.component"

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UtilisateursComponent,
    UtilisateurDetailsComponent,
    MajorsComponent,
    MajorUtilisateursComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    CommonModule,
    QuizzComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
