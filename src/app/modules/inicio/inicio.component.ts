import { Component } from '@angular/core';
import { HubComponent } from '@shared/hub/hub.component';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import contenidoData from 'src/app/data/contenido.json'

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [HubComponent, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  contenido: any[] = [];
  
  ngOnInit(): void {
    this.contenido = contenidoData.contenido;
  }

  meGusta(titulo: string): void {
    alert(`¡Te gustó: ${titulo}!`);
  }

  ocultar(item: any): void {
    this.contenido = this.contenido.filter(i => i !== item);
  }
}
