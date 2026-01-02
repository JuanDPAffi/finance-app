import { Component, inject, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para pipes como currency y date
import { TransactionService } from '../../services/transaction';
import { Observable } from 'rxjs';
import { Transaction } from '../../models/transaction.model';
import Swal from 'sweetalert2'; // Importamos SweetAlert

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule], // Necesario para usar el pipe 'async' y loops
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.scss'
})
export class TransactionListComponent implements OnChanges {
  @Input() userId!: string;
  @Output() onEdit = new EventEmitter<Transaction>(); // Nuevo evento
  private transactionService = inject(TransactionService);
  
  transactions$: Observable<Transaction[]> | undefined; // Puede ser undefined al inicio

  // Este método se ejecuta cuando cambia el Input [userId]
  ngOnChanges(changes: SimpleChanges) {
    if (this.userId) {
      this.transactions$ = this.transactionService.getTransactions(this.userId);
    }
  }

  async deleteItem(id: string | undefined) {
    if (!id) return;

    const result = await Swal.fire({
      title: '¿Eliminar movimiento?',
      text: "No podrás recuperar esta información",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444', // Rojo
      cancelButtonColor: '#3085d6', // Azul
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await this.transactionService.deleteTransaction(id);
        Swal.fire('¡Eliminado!', 'El movimiento ha sido borrado.', 'success');
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar', 'error');
      }
    }
  }

  // Nueva función para emitir el evento de editar
  editItem(item: Transaction) {
    this.onEdit.emit(item);
  }
}