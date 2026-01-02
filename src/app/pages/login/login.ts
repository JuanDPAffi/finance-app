import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth'; // Asegúrate de tener este servicio
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="login-container">
      <div class="card-style login-card">
        <div class="login-header">
          <span class="login-icon">🚀</span>
          <h2>FinanceApp</h2>
          <p>Tu dinero, bajo control.</p>
        </div>
        
        <button (click)="login()" class="btn-google">
          <svg class="google-logo" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Ingresar con Google
        </button>
      </div>
    </div>
  `,
  // Estilos específicos solo para centrar
  styles: [`
    .login-container { 
      display: flex; 
      justify-content: center; 
      align-items: center; 
      min-height: 80vh; 
    }
    .login-card { 
      text-align: center; 
      max-width: 400px; 
      width: 100%; 
      padding: 3rem 2rem;
    }
    .login-header { margin-bottom: 2rem; }
    .login-icon { font-size: 3rem; display: block; margin-bottom: 1rem; }
    h2 { margin: 0; color: #1f2937; }
    p { color: #6b7280; margin: 0.5rem 0 0 0; }
  `]
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  async login() {
    try {
      await this.auth.login();
      this.router.navigate(['/']); // Redirigir al Dashboard
    } catch (err) {
      console.error(err);
    }
  }
}