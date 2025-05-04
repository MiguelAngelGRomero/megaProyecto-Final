import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing'; // Importa RouterTestingModule para pruebas con rutas

describe('AppComponent', () => {
  // Configura el entorno de pruebas antes de cada test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Se importa el componente principal y el módulo de rutas de prueba
      imports: [AppComponent, RouterTestingModule],
    }).compileComponents(); // Compila los componentes
  });

  // Verifica que la aplicación se crea correctamente
  it('debería crear la aplicación', () => {
    const fixture = TestBed.createComponent(AppComponent); // Crea una instancia del componente
    const app = fixture.componentInstance; // Obtiene la instancia del componente
    expect(app).toBeTruthy(); // Verifica que exista (sea "truthy")
  });

  // Verifica que el título de la app sea 'Hubes'
  it(`Debería tener el título 'Hubes'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Hubes'); // Compara el valor de la propiedad `title`
  });
});



