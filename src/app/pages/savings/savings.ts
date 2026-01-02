import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-savings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card-style">
      <div style="text-align: center; padding: 2rem;">
        <span style="font-size: 3rem;">🐷</span>
        <h2>Mis Ahorros</h2>
        <p>¡Próximamente podrás definir tus metas aquí!</p>
      </div>
    </div>
  `,
  styles: []
})
// IMPORTANTE: La palabra 'export' es clave para que el router la encuentre
export class SavingsComponent { }