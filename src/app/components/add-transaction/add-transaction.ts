import { Component, inject, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction';
import { Transaction } from '../../models/transaction.model';
import Swal from 'sweetalert2'; // Importamos SweetAlert

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-transaction.html',
  styleUrl: './add-transaction.scss'
})
export class AddTransactionComponent implements OnChanges {
  @Input() userId!: string;
  @Input() transactionToEdit: Transaction | null = null; // Recibimos dato para editar
  @Output() onClear = new EventEmitter<void>(); // Avisamos cuando limpiamos

  private transactionService = inject(TransactionService);

  model: Transaction = {
    amount: 0, // Iniciar en 0 o null es mejor para validación
    type: 'expense',
    category: '',
    description: '',
    date: new Date()
  };

  // Detectar si nos mandaron algo para editar
  ngOnChanges(changes: SimpleChanges) {
    if (changes['transactionToEdit'] && this.transactionToEdit) {
      // Copiamos los datos al formulario
      this.model = { ...this.transactionToEdit };
    }
  }

  async onSubmit() {
    // 1. VALIDACIÓN (Campos vacíos)
    if (this.model.amount <= 0) {
      Swal.fire('Atención', 'El monto debe ser mayor a 0', 'warning');
      return;
    }
    if (!this.model.category.trim()) {
      Swal.fire('Atención', 'Debes escribir una categoría', 'warning');
      return;
    }

    // 2. LOGICA DE GUARDADO
    try {
      if (this.model.id) {
        // MODO EDICIÓN
        await this.transactionService.updateTransaction(this.model.id, this.model);
        Swal.fire('Actualizado', 'Transacción modificada correctamente', 'success');
      } else {
        // MODO CREACIÓN
        await this.transactionService.addTransaction(this.model, this.userId);
        Swal.fire({
          icon: 'success',
          title: 'Guardado',
          text: 'Transacción registrada con éxito',
          timer: 1500,
          showConfirmButton: false
        });
      }
      
      this.resetForm();

    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Hubo un problema al guardar', 'error');
    }
  }

  resetForm() {
    this.model = {
      amount: 0,
      type: 'expense',
      category: '',
      description: '',
      date: new Date()
    };
    this.onClear.emit(); // Avisamos al padre que ya no estamos editando
  }
}