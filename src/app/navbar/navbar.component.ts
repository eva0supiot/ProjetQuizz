import { Component } from "@angular/core"
import { Link } from "models/links.model"

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  links: Link[] = []

  constructor() {
    this.links.push({ name: "Utilisateurs", href: "etudiants" })
    this.links.push({ name: "Login", href: "login" })
    this.links.push({ name: "Inscription", href: "inscription" })
    this.links.push({ name: "Profil", href: "profil" })
  }
}
