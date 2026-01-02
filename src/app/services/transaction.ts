import { Injectable, inject } from '@angular/core';
import { 
  Firestore, collection, addDoc, collectionData, query, orderBy, where, 
  doc, deleteDoc, updateDoc // <--- Nuevos imports
} from '@angular/fire/firestore'; 
import { Transaction } from '../models/transaction.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private firestore = inject(Firestore);
  private transactionsCollection = collection(this.firestore, 'transactions');

  // Crear
  addTransaction(transaction: Transaction, userId: string) {
    const newTransaction = { 
      ...transaction, 
      userId: userId, 
      date: new Date() 
    };
    return addDoc(this.transactionsCollection, newTransaction);
  }

  // Leer (Filtro por usuario)
  getTransactions(userId: string): Observable<Transaction[]> {
    const q = query(
      this.transactionsCollection, 
      where('userId', '==', userId), 
      orderBy('date', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<Transaction[]>;
  }

  // --- NUEVAS FUNCIONES ---

  // Eliminar
  deleteTransaction(id: string) {
    const docRef = doc(this.firestore, 'transactions', id);
    return deleteDoc(docRef);
  }

  // Editar
  updateTransaction(id: string, data: Partial<Transaction>) {
    const docRef = doc(this.firestore, 'transactions', id);
    return updateDoc(docRef, data);
  }
}