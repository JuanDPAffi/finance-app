import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- Importante
import { AddTransactionComponent } from './components/add-transaction/add-transaction';
import { TransactionListComponent } from './components/transaction-list/transaction-list';
import { AuthService } from './services/auth'; // <--- Importar servicio

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AddTransactionComponent, TransactionListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  authService = inject(AuthService); // <--- Inyectar
  
  // Helpers para usar en el HTML
  login() {
    this.authService.login().catch(error => console.error(error));
  }

  logout() {
    this.authService.logout();
  }
}