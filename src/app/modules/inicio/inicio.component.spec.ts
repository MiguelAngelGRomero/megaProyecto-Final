import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioComponent } from './inicio.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('InicioComponent', () => {
  let component: InicioComponent;
  let fixture: ComponentFixture<InicioComponent>;

  // Se simula el ActivatedRoute para las pruebas
  const activatedRouteStub = {
    snapshot: {
      paramMap: {
        get: (key: string) => null, // Se puede personalizar el parámetro
      },
    },
    queryParams: of({}), // Se simulan los parámetros de consulta
  };

  beforeEach(async () => {
    // Configuración del módulo de prueba
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],  // Incluye RouterTestingModule para las dependencias de enrutamiento
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub }, // Proveedor simulado de ActivatedRoute
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InicioComponent);
    component = fixture.componentInstance;

    // Simulación de datos de películas
    component.contenido = [
      { titulo: 'Película 1', imagen: 'imagen1.jpg' },
      { titulo: 'Película 2', imagen: 'imagen2.jpg' },
    ];
    fixture.detectChanges(); // Detecta cambios en la vista

    // Limpia el localStorage antes de cada prueba
    localStorage.clear();
  });

  // Verifica que el componente se crea correctamente
  it('debería crear', () => {
    expect(component).toBeTruthy();
  });

  // Verifica que se carguen datos en la propiedad 'contenido' al iniciar
  it('Debería cargar datos de contenido al iniciar.', () => {
    expect(component.contenido.length).toBeGreaterThan(0);
  });

  // Verifica que al llamar a meGusta, se dispare una alerta con el mensaje esperado
  it('Debería llamar una alerta cuando se active meGusta', () => {
    spyOn(window, 'alert'); // Simula el método alert del navegador
    component.meGusta('Película X'); // Llama al método
    expect(window.alert).toHaveBeenCalledWith('¡Te gustó: Película X!'); // Verifica que la alerta fue llamada
  });

  // Verifica que al llamar a 'ocultar', el elemento se elimine de la lista 'contenido'
  it('Debería eliminar el elemento de contenidoPeliculas cuando se llama a ocultar', () => {
    const initialLength = component.contenido.length;
    const itemToRemove = component.contenido[0]; // Se selecciona el primer elemento para eliminar
    
    component.ocultar(itemToRemove); // Llama al método
    expect(component.contenido.length).toBe(initialLength - 1); // Verifica que el tamaño de la lista haya disminuido
    expect(component.contenido).not.toContain(itemToRemove); // Verifica que el elemento haya sido removido
  });

  // Verifica que al llamar a 'marcarFavorito', el elemento se agregue al localStorage
  it('Debería agregar el elemento a localStorage cuando se llama a marcarFavorito', () => {
    const mockItem = { 
      titulo: 'Mi vecino Totoro', 
      imagen: '/img/miVecino.jpg',
    };

    spyOn(window, 'alert'); // Simula la alerta
    spyOn(localStorage, 'getItem').and.returnValue('[]'); // Simula que no hay favoritos en el localStorage
    const setItemSpy = spyOn(localStorage, 'setItem').and.callThrough(); // Simula el método setItem de localStorage

    component.marcarFavorito(mockItem); // Llama al método
    fixture.detectChanges(); // Actualiza la vista

    // Verifica que setItem haya sido llamado con el título de la película
    expect(setItemSpy).toHaveBeenCalledWith(
      'favoritos', 
      jasmine.stringContaining(JSON.stringify(mockItem.titulo))
    );

    // Verifica que el objeto favorito haya sido agregado correctamente
    const expectedValue = JSON.stringify([{ 
      titulo: mockItem.titulo, 
      imagen: mockItem.imagen 
    }]);
    expect(setItemSpy).toHaveBeenCalledWith('favoritos', expectedValue);

    // Verifica que la alerta haya sido llamada con el mensaje correcto
    expect(window.alert).toHaveBeenCalledWith(`Agregado a favoritos: ${mockItem.titulo}`);
  });

  // Verifica que no se agreguen elementos duplicados al localStorage
  it('No debe agregar elementos duplicados al almacenamiento local', () => {
    const item = component.contenido[0];
    spyOn(window, 'alert'); // Simula la alerta
    spyOn(window.localStorage, 'getItem').and.returnValue(JSON.stringify([{ titulo: item.titulo, imagen: item.imagen }])); // Simula que ya hay un favorito guardado
    spyOn(window.localStorage, 'setItem'); // Simula el método setItem

    component.marcarFavorito(item); // Llama al método para agregar el favorito
    component.marcarFavorito(item); // Llama nuevamente para intentar agregar el mismo elemento

    // Verifica que solo haya un elemento con el mismo título
    const favoritos = JSON.parse(window.localStorage.getItem('favoritos') || '[]');
    const count = favoritos.filter((fav: any) => fav.titulo === item.titulo).length;
    expect(count).toBe(1);

    // Verifica que se haya mostrado una alerta indicando que el elemento ya está en los favoritos
    expect(window.alert).toHaveBeenCalledWith(`${item.titulo} ya está en tus favoritos.`);
  });
});

