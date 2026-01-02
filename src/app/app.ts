import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. IMPORTAR ESTO:
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './services/auth'; // Asegúrate que la ruta sea correcta

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive], 
  templateUrl: './app.html',
  styleUrls: ['./app.scss'] // <-- fix: plural
})
export class App {
  authService = inject(AuthService);
  router = inject(Router); // <-- inject Router

  login() {
    this.authService.login().catch(error => console.error(error));
  }

  async logout() {                      // <-- make it async for clarity
    try {
      await this.authService.logout();
      this.router.navigate(['/login']); // <-- replace stray `redirect`
    } catch (err) {
      console.error(err);
    }
  }
}