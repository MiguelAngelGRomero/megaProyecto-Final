import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeriesComponent } from './series.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('SeriesComponent', () => {
  let component: SeriesComponent;
  let fixture: ComponentFixture<SeriesComponent>;

  // Simulación de ActivatedRoute
  const activatedRouteStub = {
    snapshot: {
      paramMap: {
        get: (key: string) => null, // Puedes personalizar los parámetros según tus necesidades
      },
    },
    queryParams: of({}), // Aquí puedes agregar parámetros de consulta si es necesario
  };

  beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [RouterTestingModule],  // Asegúrate de incluir RouterTestingModule
        providers: [
          { provide: ActivatedRoute, useValue: activatedRouteStub }, // Proveedor simulado
        ],
      }).compileComponents();
  
      fixture = TestBed.createComponent(SeriesComponent);
      component = fixture.componentInstance;

      // Simular datos de Series para las pruebas
    component.contenidoSeries = [
      { titulo: 'Película 1', imagen: 'imagen1.jpg' },
      { titulo: 'Película 2', imagen: 'imagen2.jpg' },
    ];
    fixture.detectChanges();

    // Limpiar localStorage antes de cada test
    localStorage.clear();
  });

  it('debería crear', () => {
    expect(component).toBeTruthy();
  });

  it('Debería cargar datos de contenido al iniciar.', () => {
    expect(component.contenidoSeries.length).toBeGreaterThan(0);
  });

  it('Debería llamar una alerta cuando se active meGusta', () => {
    spyOn(window, 'alert');
    component.meGusta('Película X');
    expect(window.alert).toHaveBeenCalledWith('¡Te gustó: Película X!');
  });

  it('Debería eliminar el elemento de contenidoSeries cuando se llama a ocultar', () => {
    const initialLength = component.contenidoSeries.length;
    const itemToRemove = component.contenidoSeries[0];

    component.ocultar(itemToRemove);

    expect(component.contenidoSeries.length).toBe(initialLength - 1);
    expect(component.contenidoSeries).not.toContain(itemToRemove);
  });

  it('Debería agregar el elemento a localStorage cuando se llama a marcarFavorito', () => {
    const mockItem = { 
      titulo: 'Mi vecino Totoro', 
      imagen: '/img/miVecino.jpg',
    };
    
    spyOn(window, 'alert');
    spyOn(localStorage, 'getItem').and.returnValue('[]');
    const setItemSpy = spyOn(localStorage, 'setItem').and.callThrough();
    
  
    component.marcarFavorito(mockItem);
    fixture.detectChanges();
    
    
    expect(setItemSpy).toHaveBeenCalledWith(
      'favoritos', 
      jasmine.stringContaining(JSON.stringify(mockItem.titulo))
    );
    
    
    const expectedValue = JSON.stringify([{ 
      titulo: mockItem.titulo, 
      imagen: mockItem.imagen 
    }]);
    expect(setItemSpy).toHaveBeenCalledWith('favoritos', expectedValue);
    
    expect(window.alert).toHaveBeenCalledWith(`Agregado a favoritos: ${mockItem.titulo}`);
  });

  it('No debe agregar elementos duplicados al almacenamiento local', () => {
    const item = component.contenidoSeries[0];
    spyOn(window, 'alert');
    spyOn(window.localStorage, 'getItem').and.returnValue(JSON.stringify([{ titulo: item.titulo, imagen: item.imagen }]));
    spyOn(window.localStorage, 'setItem');

    component.marcarFavorito(item);
    component.marcarFavorito(item);

    const favoritos = JSON.parse(window.localStorage.getItem('favoritos') || '[]');
    const count = favoritos.filter((fav: any) => fav.titulo === item.titulo).length;

    expect(count).toBe(1);
    expect(window.alert).toHaveBeenCalledWith(`${item.titulo} ya está en tus favoritos.`);
  });

});