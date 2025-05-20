// Importaciones necesarias desde Angular y el proyecto
import { Component } from '@angular/core';
import { HubComponent } from '@shared/hub/hub.component'; // Componente reutilizable
import { CommonModule } from '@angular/common'; // Módulo común de Angular
import { OnInit } from '@angular/core'; // Interfaz para el hook de inicialización
import { ContenidoService } from 'src/app/services/Contenido.service';

// Declaración del componente como standalone
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [HubComponent, CommonModule], // Módulos que se usan en el HTML del componente
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit {
  // Arreglo que almacenará el contenido cargado desde el JSON
  contenido: any[] = [];

  constructor(private contenidoService: ContenidoService) {}

  // Hook que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.contenidoService.obtenerContenidos().subscribe({
      next: data => {
        this.contenido = data;
      },
      error: err => {
        console.error('Error al cargar contenidos:', err);
      }

    })
  }

  // Muestra un mensaje indicando que al usuario le gusta el contenido
  meGusta(titulo: string): void {
    alert(`¡Te gustó: ${titulo}!`);
  }

  // Oculta (elimina) un elemento del arreglo de contenido
  ocultar(item: any): void {
    this.contenido = this.contenido.filter(i => i !== item);
  }

  // Agrega un ítem a la lista de favoritos si aún no está presente
  marcarFavorito(item: any): void {
    // Obtiene la lista de favoritos desde localStorage
    let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');

    // Verifica si el ítem ya existe en favoritos
    const yaExiste = favoritos.some((fav: any) => fav.titulo === item.titulo);

    if (!yaExiste) {
      // Si no existe, lo agrega y guarda la lista actualizada
      favoritos.push(item);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
      alert(`Agregado a favoritos: ${item.titulo}`);
    } else {
      // Si ya está, muestra una alerta
      alert(`${item.titulo} ya está en tus favoritos.`);
    }
  }
}

