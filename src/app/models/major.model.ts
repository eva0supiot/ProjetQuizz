import { Utilisateur } from "./utilisateur.model"

export interface Major {
  id?: bigint
  name: string
  description: string
  utilisateurs: Utilisateur[]
}
