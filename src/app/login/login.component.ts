import { Component } from '@angular/core';
import { MatButton } from "@angular/material/button"
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio"
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { AsyncPipe } from "@angular/common"
import { ActivatedRoute, Router, RouterLink } from "@angular/router"
import { Observable } from "rxjs"
import { Utilisateur } from "../models/utilisateur.model"
import { UtilisateurService } from "../services/utilisateur.service"
import { inputNames } from "@angular/cdk/schematics"
import { MatSnackBar } from "@angular/material/snack-bar"

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    MatButton,
    MatRadioButton,
    MatRadioGroup,
    ReactiveFormsModule,
    AsyncPipe,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  utilisateurs$: Observable<Utilisateur[]> = this.utilisateurService.findAll();
  utilisateurs : Utilisateur [] = [];

  userForm = new FormGroup({
    pseudo: new FormControl('', [Validators.required]),
    mdp: new FormControl('', [Validators.required]),
  })


  // il existe deux facons de faire des formulaires en angular : ici les reactives forms (sinon c'est ngForm)
  /* myForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    mdp: new FormControl('', [Validators.required]),
    score: new FormControl('', [Validators.required]),
    imageName: new FormControl('', Validators.required)
  });*/

  constructor(private _route: ActivatedRoute, private utilisateurService: UtilisateurService, private router: Router,
              private _snackBar: MatSnackBar) {
    this.utilisateurService.findAll().subscribe((data)=> this.utilisateurs = data)

  }
  /*
    // cette méthode mock le post au back
    postUser(user : User) {
      this.users.push(user);
    }

    // cette méthode sert à faire comme si j'appelais mon API et qu'elle me retournais deux utilisateurs
    mockUserData() : Observable<User[]> {
      // @ts-ignore
      const users : User[] = [{name: "Dorian", mdp: "123456", score: "15", imageName: "PhotoProfil1"}]
      return of(users)
    }
  }


  // a mettre dans un autre fichier
  export interface User {
    name: string,
    mdp: string,
    score: string,
    imageName : string
  }*/
  ngOnInit(): void {}


  connexion() {
    console.log(this.userForm)
    this.utilisateurs.forEach((user: Utilisateur) => {
      if(user.pseudo === this.userForm.value.pseudo && user.mdp === this.userForm.value.mdp) {
        if(user.admin === true)
        {
          this.router.navigate(["profil-admin"])
        }
        else if(user.admin === false){
          this.router.navigate(["profil"])
        }
      }
      else {
        this._snackBar.open("Vous n'etes pas qln qu'on connait", '', {duration: 1000} )
      }

    })
  }
}
