import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importamos FormsModule para usar ngModel
  templateUrl: './add-transaction.html',
  styleUrl: './add-transaction.scss'
})
export class AddTransactionComponent {
  @Input() userId!: string;
  private transactionService = inject(TransactionService);

  // Modelo inicial del formulario
  model: Transaction = {
    amount: 0,
    type: 'expense', // Por defecto es gasto
    category: '',
    description: '',
    date: new Date()
  };

  async onSubmit() {
    if (!this.userId) return;
    console.log('Guardando...', this.model);
    try {
      await this.transactionService.addTransaction(this.model, this.userId);
      alert('¡Transacción guardada con éxito!');
      // Reiniciar formulario (opcional)
      this.model = { ...this.model, amount: 0, description: '' };
    } catch (error) {
      console.error(error);
      alert('Error al guardar');
    }
  }
}