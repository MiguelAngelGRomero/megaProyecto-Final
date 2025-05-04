import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritosComponent } from './favoritos.component';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HubComponent } from '@shared/hub/hub.component';

// Clase mock para reemplazar ActivatedRoute durante pruebas
class MockActivatedRoute {}

describe('FavoritosComponent', () => {
  let component: FavoritosComponent;
  let fixture: ComponentFixture<FavoritosComponent>;

  // Configuración antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FavoritosComponent,
        RouterModule.forRoot([]) // Simula el Router necesario por [routerLink]
      ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute } // Inyecta ruta simulada
      ]
    }).compileComponents();

    // Prepara el localStorage con datos de prueba ANTES de inicializar el componente
    localStorage.setItem('favoritos', JSON.stringify([
      { titulo: 'Película 1', imagen: 'imagen1.jpg' },
      { titulo: 'Película 2', imagen: 'imagen2.jpg' }
    ]));

    fixture = TestBed.createComponent(FavoritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Dispara ngOnInit y renderiza la vista
  });

  // Limpia el localStorage después de cada prueba
  afterEach(() => {
    localStorage.clear();
  });

  // Verifica que el componente se cree correctamente
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  // Verifica que los datos del localStorage se carguen al iniciar
  it('debería cargar los favoritos desde el localStorage al iniciar', () => {
    expect(component.favoritos.length).toBe(2);
    expect(component.favoritos[0].titulo).toBe('Película 1');
  });

  // Verifica que quitar un favorito lo elimine de la lista y del localStorage
  it('debería eliminar un favorito y actualizar el localStorage', () => {
    const initialCount = component.favoritos.length;
    const itemAEliminar = component.favoritos[0];
    
    component.quitarFavorito(itemAEliminar); // Llama al método
    fixture.detectChanges(); // Refresca la vista
    
    expect(component.favoritos.length).toBe(initialCount - 1);
    expect(component.favoritos.some(f => f.titulo === itemAEliminar.titulo)).toBeFalse();

    const dataGuardada = JSON.parse(localStorage.getItem('favoritos') || '[]');
    expect(dataGuardada.length).toBe(initialCount - 1);
  });

  // Verifica que se muestre el mensaje cuando no hay favoritos
  it('debería mostrar el mensaje cuando no hay favoritos', () => {
    component.favoritos = []; // Limpia la lista manualmente
    localStorage.setItem('favoritos', JSON.stringify([]));
    fixture.detectChanges(); // Actualiza el DOM

    const mensaje = fixture.debugElement.query(By.css('#contenedorFavoritos'));
    expect(mensaje.nativeElement.textContent).toContain('No hay elementos favoritos aún.');
  });

  // Verifica que se rendericen los favoritos si existen
  it('debería mostrar la lista de favoritos si hay elementos', () => {
    fixture.detectChanges();

    const itemsRenderizados = fixture.debugElement.queryAll(By.css('.divContenido'));
    expect(itemsRenderizados.length).toBe(2);

    // Confirma que se muestre el título de uno de los favoritos
    const contienePelícula1 = itemsRenderizados.some(item => 
      item.nativeElement.textContent.includes('Película 1')
    );
    expect(contienePelícula1).toBeTrue();
  });
});


