import { Component } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.scss'
})
export class ConfiguracionComponent {
  public acciones$ = new Subject<string>();

  cerrarSesion() {
    this.acciones$.next('cerrar-sesion');
  }
}

