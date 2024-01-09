import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink], // Importamos el RouterLink de Angular para que funcione -por ejemplo- el routerLink="/home" de app.component.html y hay que hacer esto en cada componente que queramos mostrar en el html principal
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
