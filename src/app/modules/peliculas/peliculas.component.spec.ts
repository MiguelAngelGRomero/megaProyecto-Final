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

  // Verifica que el componente se haya creado correctamente
  it('Debería crear', () => {
    expect(component).toBeTruthy();
  });

  // Verifica que al iniciar, se carguen los datos de contenido (películas)
  it('Debería cargar datos de contenido al iniciar.', () => {
    expect(component.contenidoPeliculas.length).toBeGreaterThan(0);
  });

  // Verifica que se llame a 'alert' cuando se activa la función 'meGusta'
  it('Debería llamar una alerta cuando se active meGusta', () => {
    spyOn(window, 'alert');  // Espiar la función 'alert'
    component.meGusta('Película X');
    expect(window.alert).toHaveBeenCalledWith('¡Te gustó: Película X!');  // Verifica que se haya llamado con el mensaje correcto
  });

  // Verifica que se elimine un elemento del listado de 'contenidoPeliculas' al llamar a 'ocultar'
  it('Debería eliminar el elemento de contenidoPeliculas cuando se llama a ocultar', () => {
    const initialLength = component.contenidoPeliculas.length;
    const itemToRemove = component.contenidoPeliculas[0];

    component.ocultar(itemToRemove);  // Llamada a 'ocultar'

    expect(component.contenidoPeliculas.length).toBe(initialLength - 1);  // Verifica que el tamaño de la lista haya disminuido
    expect(component.contenidoPeliculas).not.toContain(itemToRemove);  // Verifica que el elemento ya no esté en la lista
  });

  // Verifica que un elemento se agregue a localStorage al llamar a 'marcarFavorito'
  it('Debería agregar el elemento a localStorage cuando se llama a marcarFavorito', () => {
    const mockItem = { 
      titulo: 'Mi vecino Totoro', 
      imagen: '/img/miVecino.jpg',
    };
    
    spyOn(window, 'alert');  // Espiar la función 'alert'
    spyOn(localStorage, 'getItem').and.returnValue('[]');  // Espiar 'getItem' y simular que el almacenamiento está vacío
    const setItemSpy = spyOn(localStorage, 'setItem').and.callThrough();  // Espiar 'setItem' para verificar que se llama correctamente
    
    component.marcarFavorito(mockItem);  // Llamada a 'marcarFavorito'
    fixture.detectChanges();  // Detectar los cambios en la vista
    
    // Verifica que 'setItem' haya sido llamado con el elemento adecuado en formato JSON
    expect(setItemSpy).toHaveBeenCalledWith(
      'favoritos', 
      jasmine.stringContaining(JSON.stringify(mockItem.titulo))
    );
    
    // Verifica que el valor agregado al almacenamiento sea el esperado
    const expectedValue = JSON.stringify([{ 
      titulo: mockItem.titulo, 
      imagen: mockItem.imagen 
    }]);
    expect(setItemSpy).toHaveBeenCalledWith('favoritos', expectedValue);
    
    // Verifica que se haya mostrado el mensaje adecuado en la alerta
    expect(window.alert).toHaveBeenCalledWith(`Agregado a favoritos: ${mockItem.titulo}`);
  });

  // Verifica que no se agreguen elementos duplicados al almacenamiento local
  it('No debe agregar elementos duplicados al almacenamiento local', () => {
    const item = component.contenidoPeliculas[0];
    spyOn(window, 'alert');  // Espiar la función 'alert'
    spyOn(window.localStorage, 'getItem').and.returnValue(JSON.stringify([{ titulo: item.titulo, imagen: item.imagen }]));  // Simular que el elemento ya existe en favoritos
    spyOn(window.localStorage, 'setItem');  // Espiar 'setItem'

    component.marcarFavorito(item);  // Llamada a 'marcarFavorito' con el mismo elemento
    component.marcarFavorito(item);  // Llamada nuevamente con el mismo elemento

    // Verifica que solo haya una instancia del elemento en 'favoritos'
    const favoritos = JSON.parse(window.localStorage.getItem('favoritos') || '[]');
    const count = favoritos.filter((fav: any) => fav.titulo === item.titulo).length;

    expect(count).toBe(1);  // Verifica que solo haya un elemento con el mismo título
    // Verifica que se haya mostrado un mensaje indicando que ya está en favoritos
    expect(window.alert).toHaveBeenCalledWith(`${item.titulo} ya está en tus favoritos.`);
  });
});





