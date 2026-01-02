import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, orderBy, where } from '@angular/fire/firestore'; 
import { Transaction } from '../models/transaction.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private firestore = inject(Firestore);
  private transactionsCollection = collection(this.firestore, 'transactions');

  // AHORA RECIBE EL USER ID
  addTransaction(transaction: Transaction, userId: string) {
    const newTransaction = { 
      ...transaction, 
      userId: userId, // <--- Guardamos quién lo hizo
      date: new Date() 
    };
    return addDoc(this.transactionsCollection, newTransaction);
  }

  // AHORA FILTRA POR USER ID
  getTransactions(userId: string): Observable<Transaction[]> {
    // La consulta dice: "Donde el campo userId sea igual al userId que te paso"
    const q = query(
      this.transactionsCollection, 
      where('userId', '==', userId), 
      orderBy('date', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<Transaction[]>;
  }
}