import { Component } from '@angular/core';
import { HubComponent } from '@shared/hub/hub.component';
import { CommonModule  } from '@angular/common';
import contenidoSeries from 'src/app/data/series.json'

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [HubComponent, CommonModule],
  templateUrl: './series.component.html',
  styleUrl: './series.component.scss'
})
export class SeriesComponent {
  contenidoSeries: any[] = [];
  
  ngOnInit(): void {
    this.contenidoSeries = contenidoSeries.contenido;
  }

  meGusta(titulo: string): void {
    alert(`¡Te gustó: ${titulo}!`);
  }

  ocultar(item: any): void {
    this.contenidoSeries = this.contenidoSeries.filter(i => i !== item);
  }
}
