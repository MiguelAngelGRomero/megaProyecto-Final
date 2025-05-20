// Importaciones necesarias
import { Component } from '@angular/core';
import { HubComponent } from '@shared/hub/hub.component'; // Componente compartido
import { CommonModule } from '@angular/common'; // Funciones comunes de Angular
import { ContenidoService } from 'src/app/services/Contenido.service';
// Declaración del componente como standalone
@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [HubComponent, CommonModule], // Importa componentes y módulos necesarios
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.scss'
})
export class PeliculasComponent {
  // Arreglo para almacenar las películas cargadas
  contenidoPeliculas: any[] = [];

  constructor(private contenidoService: ContenidoService) {}
  
  // Ciclo de vida que se ejecuta al iniciar el componente
  ngOnInit(): void {
    // Carga los datos desde el archivo JSON
    this.contenidoService.obtenerContenidos().subscribe({
      next: (data) => {
        // Filtramos solo los que son de tipo 'pelicula' (o 'peliculas' si así lo guardas)
        this.contenidoPeliculas = data.filter((item: any) =>
          item.tipo.toLowerCase() === 'película'  // ajusta según tu valor exacto en la base
        );
      },
      error: (err) => {
        console.error('Error cargando películas:', err);
      }
    })
  }

  // Muestra un mensaje cuando al usuario le gusta una película
  meGusta(titulo: string): void {
    alert(`¡Te gustó: ${titulo}!`);
  }

  // Oculta una película de la lista filtrándola
  ocultar(item: any): void {
    this.contenidoPeliculas = this.contenidoPeliculas.filter(i => i !== item);
  }

  // Marca una película como favorita y la guarda en localStorage
  marcarFavorito(item: any): void {
    let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');

    // Verifica si ya está en la lista
    const yaExiste = favoritos.some((fav: any) => fav.titulo === item.titulo);

    if (!yaExiste) {
      // Si no existe, se agrega y guarda
      favoritos.push(item);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
      alert(`Agregado a favoritos: ${item.titulo}`);
    } else {
      // Si ya está, muestra mensaje
      alert(`${item.titulo} ya está en tus favoritos.`);
    }
  }
}

