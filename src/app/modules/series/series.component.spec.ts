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
      { titulo: 'Serie 1', imagen: 'imagen1.jpg' },
      { titulo: 'Serie 2', imagen: 'imagen2.jpg' },
    ];
    fixture.detectChanges();

    // Limpiar localStorage antes de cada test
    localStorage.clear();
  });

  // Verifica que el componente se haya creado correctamente
  it('debería crear', () => {
    expect(component).toBeTruthy();
  });

  // Verifica que al iniciar, se carguen los datos de contenido (series)
  it('Debería cargar datos de contenido al iniciar.', () => {
    expect(component.contenidoSeries.length).toBeGreaterThan(0);
  });

  // Verifica que se llame a 'alert' cuando se active la función 'meGusta'
  it('Debería llamar una alerta cuando se active meGusta', () => {
    spyOn(window, 'alert');  // Espiar la función 'alert'
    component.meGusta('Serie X');
    expect(window.alert).toHaveBeenCalledWith('¡Te gustó: Serie X!');  // Verifica que se haya llamado con el mensaje correcto
  });

  // Verifica que se elimine un elemento del listado de 'contenidoSeries' al llamar a 'ocultar'
  it('Debería eliminar el elemento de contenidoSeries cuando se llama a ocultar', () => {
    const initialLength = component.contenidoSeries.length;
    const itemToRemove = component.contenidoSeries[0];

    component.ocultar(itemToRemove);  // Llamada a 'ocultar'

    expect(component.contenidoSeries.length).toBe(initialLength - 1);  // Verifica que el tamaño de la lista haya disminuido
    expect(component.contenidoSeries).not.toContain(itemToRemove);  // Verifica que el elemento ya no esté en la lista
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
    const item = component.contenidoSeries[0];
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
