import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { SavingsComponent } from './pages/savings/savings';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

// Helpers de seguridad
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

export const routes: Routes = [
  { 
    path: '', 
    component: DashboardComponent,
    ...canActivate(redirectUnauthorizedToLogin) // Candado: Solo usuarios
  },
  { 
    path: 'savings', 
    component: SavingsComponent,
    ...canActivate(redirectUnauthorizedToLogin) // Candado: Solo usuarios
  },
  { 
    path: 'login', 
    component: LoginComponent,
    ...canActivate(redirectLoggedInToHome) // Si ya entró, mándalo al home
  },
  { path: '**', redirectTo: '' }
];