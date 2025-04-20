import { Component } from '@angular/core';
import { HubComponent } from '@shared/hub/hub.component';
import { CommonModule  } from '@angular/common';
import contenidoPeliculas from 'src/app/data/peliculas.json'

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [HubComponent, CommonModule],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.scss'
})
export class PeliculasComponent {
  contenidoPeliculas: any[] = [];
  
  ngOnInit(): void {
    this.contenidoPeliculas = contenidoPeliculas.contenido;
  }

  meGusta(titulo: string): void {
    alert(`¡Te gustó: ${titulo}!`);
  }

  ocultar(item: any): void {
    this.contenidoPeliculas = this.contenidoPeliculas.filter(i => i !== item);
  }
}
