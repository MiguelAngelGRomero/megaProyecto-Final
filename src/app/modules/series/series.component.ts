// Importaciones necesarias
import { Component } from '@angular/core';
import { HubComponent } from '@shared/hub/hub.component'; // Componente compartido usado en la vista
import { CommonModule } from '@angular/common'; // Funcionalidades comunes de Angular
import contenidoSeries from 'src/app/data/series.json'; // Archivo JSON con los datos de series

// Declaración del componente como standalone
@Component({
  selector: 'app-series',
  standalone: true,
  imports: [HubComponent, CommonModule], // Módulos y componentes que se usan en el template
  templateUrl: './series.component.html',
  styleUrl: './series.component.scss'
})
export class SeriesComponent {
  // Arreglo que contendrá las series cargadas
  contenidoSeries: any[] = [];
  
  // Se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    // Carga los datos desde el JSON y los asigna al arreglo
    this.contenidoSeries = contenidoSeries.contenido;
  }

  // Muestra un mensaje cuando el usuario indica que le gusta una serie
  meGusta(titulo: string): void {
    alert(`¡Te gustó: ${titulo}!`);
  }

  // Elimina una serie de la lista visible
  ocultar(item: any): void {
    this.contenidoSeries = this.contenidoSeries.filter(i => i !== item);
  }

  // Agrega una serie a la lista de favoritos en localStorage si no existe ya
  marcarFavorito(item: any): void {
    let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');

    // Verifica si ya está en favoritos
    const yaExiste = favoritos.some((fav: any) => fav.titulo === item.titulo);

    if (!yaExiste) {
      // Agrega la serie a favoritos
      favoritos.push(item);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
      alert(`Agregado a favoritos: ${item.titulo}`);
    } else {
      // Notifica si ya existe
      alert(`${item.titulo} ya está en tus favoritos.`);
    }
  }
}

