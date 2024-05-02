import { Component, Inject } from "@angular/core"
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
import { AuthService } from "../services/auth.service";

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


  constructor(private _route: ActivatedRoute, private utilisateurService: UtilisateurService, private router: Router,
              private _snackBar: MatSnackBar, private authService: AuthService) {
    this.utilisateurService.findAll().subscribe((data)=> this.utilisateurs = data)

  }



  connexion() {
    const { pseudo, mdp } = this.userForm.value;
    this.utilisateurService.findAll().subscribe(users => {
      const user = users.find(u => u.pseudo === pseudo && u.mdp === mdp);
      if (user) {
        this.authService.login(user);
        this.router.navigate([user.admin ? 'profil-admin' : 'profil'], { queryParams: { username: user.pseudo } });
      } else {
        this._snackBar.open("Identifiants incorrects", '', { duration: 3000 });
      }
    });
  }

}
