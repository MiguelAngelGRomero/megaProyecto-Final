import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeliculasComponent } from './peliculas.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';  // Asegúrate de importar esto correctamente

describe('PeliculasComponent', () => {
  let component: PeliculasComponent;
  let fixture: ComponentFixture<PeliculasComponent>;

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

    fixture = TestBed.createComponent(PeliculasComponent);
    component = fixture.componentInstance;

    // Simular datos de películas para las pruebas
    component.contenidoPeliculas = [
      { titulo: 'Película 1', imagen: 'imagen1.jpg' },
      { titulo: 'Película 2', imagen: 'imagen2.jpg' },
    ];
    fixture.detectChanges();

    // Limpiar localStorage antes de cada test
    localStorage.clear();
  });

  it('Debería crear', () => {
    expect(component).toBeTruthy();
  });

  it('Debería cargar datos de contenido al iniciar.', () => {
    expect(component.contenidoPeliculas.length).toBeGreaterThan(0);
  });

  it('Debería llamar una alerta cuando se active meGusta', () => {
    spyOn(window, 'alert');
    component.meGusta('Película X');
    expect(window.alert).toHaveBeenCalledWith('¡Te gustó: Película X!');
  });

  it('Debería eliminar el elemento de contenidoPeliculas cuando se llama a ocultar', () => {
    const initialLength = component.contenidoPeliculas.length;
    const itemToRemove = component.contenidoPeliculas[0];

    component.ocultar(itemToRemove);

    expect(component.contenidoPeliculas.length).toBe(initialLength - 1);
    expect(component.contenidoPeliculas).not.toContain(itemToRemove);
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
    const item = component.contenidoPeliculas[0];
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





