export interface Transaction {
  id?: string;          // El ID nos lo dará Firebase después
  amount: number;       // Cuánto dinero
  type: 'income' | 'expense'; // ¿Ingreso o Gasto?
  category: string;     // Ej: Casa, Comida, Salario
  date: any;            // Usaremos 'any' por ahora para facilitar fechas de Firebase
  description: string;  // Nota opcional
}