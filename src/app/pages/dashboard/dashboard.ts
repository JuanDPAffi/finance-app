import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { AddTransactionComponent } from '../../components/add-transaction/add-transaction';
import { TransactionListComponent } from '../../components/transaction-list/transaction-list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AddTransactionComponent, TransactionListComponent],
  template: `
    <div class="dashboard-container">
      @if (auth.user$ | async; as user) {
        <header class="page-header">
          <h2>Hola, {{ (user.displayName || 'Usuario').split(' ')[0] }} 👋</h2>
          <p class="subtitle">Aquí está tu resumen financiero</p>
        </header>

        <div class="content-grid">
          <div class="left-panel">
            <app-add-transaction [userId]="user.uid"></app-add-transaction>
          </div>
          
          <div class="right-panel">
            <app-transaction-list [userId]="user.uid"></app-transaction-list>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .page-header { margin-bottom: 2rem; h2 { margin-bottom: 0.2rem;} .subtitle { color: #6b7280; margin-top:0; } }
    .content-grid { display: grid; gap: 2rem; grid-template-columns: 1fr; }
    
    /* En pantallas grandes, poner lado a lado */
    @media (min-width: 768px) {
      .content-grid { grid-template-columns: 400px 1fr; align-items: start; }
    }
  `]
})
export class DashboardComponent {
  auth = inject(AuthService);
}