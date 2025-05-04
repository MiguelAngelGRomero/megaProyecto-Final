// Importaciones necesarias desde Angular y el proyecto
import { Component, OnInit } from '@angular/core'; // Importación de Angular core para componentes y hooks
import { HubComponent } from '@shared/hub/hub.component'; // Componente compartido
import { CommonModule } from '@angular/common'; // Módulo común de Angular

// Declaración del componente como standalone
@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [HubComponent, CommonModule], // Módulos utilizados por el componente
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.scss'
})
export class FavoritosComponent implements OnInit {
  // Arreglo para almacenar los elementos favoritos
  favoritos: any[] = [];

  // Hook que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Intenta obtener la lista de favoritos desde el localStorage
    const data = localStorage.getItem('favoritos');
    
    // Si hay datos en localStorage, los convierte a arreglo y los asigna a la variable 'favoritos'
    this.favoritos = data ? JSON.parse(data) : [];
  }

  // Método para quitar un favorito de la lista
  quitarFavorito(item: any): void {
    // Filtra el arreglo de favoritos para eliminar el ítem seleccionado
    this.favoritos = this.favoritos.filter(f => f.titulo !== item.titulo);

    // Actualiza el localStorage con la lista de favoritos modificada
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
  }
}

