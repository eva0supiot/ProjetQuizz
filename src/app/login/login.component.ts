import { Component } from '@angular/core';
import { MatButton } from "@angular/material/button"
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio"
import { ReactiveFormsModule } from "@angular/forms"

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    MatButton,
    MatRadioButton,
    MatRadioGroup,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
