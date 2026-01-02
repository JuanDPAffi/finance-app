import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para pipes como currency y date
import { TransactionService } from '../../services/transaction';
import { Observable } from 'rxjs';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule], // Necesario para usar el pipe 'async' y loops
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.scss'
})
export class TransactionListComponent implements OnChanges {
  @Input() userId!: string; // <--- Recibimos el ID
  private transactionService = inject(TransactionService);
  
  transactions$: Observable<Transaction[]> | undefined; // Puede ser undefined al inicio

  // Este método se ejecuta cuando cambia el Input [userId]
  ngOnChanges(changes: SimpleChanges) {
    if (this.userId) {
      this.transactions$ = this.transactionService.getTransactions(this.userId);
    }
  }
}