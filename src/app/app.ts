import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],  // ← IMPORTANTE: Importar o RouterOutlet
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'minha-biblioteca';
}
