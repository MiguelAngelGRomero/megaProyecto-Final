import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfiguracionComponent } from './configuracion.component';
import { By } from '@angular/platform-browser';
import { take } from 'rxjs';

describe('ConfiguracionComponent', () => {
  let component: ConfiguracionComponent;
  let fixture: ComponentFixture<ConfiguracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ConfiguracionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el título "Hubes: Configuracion"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titulo = compiled.querySelector('h1')?.textContent;
    expect(titulo).toContain('Hubes: Configuracion');
  });

  it('debería renderizar 2 botones de navegación', () => {
    const botones = fixture.nativeElement.querySelectorAll('button');
    expect(botones.length).toBe(2);
  });

  it('debería tener los routerLink correctos en los botones', () => {
    const debugElement = fixture.debugElement;
    const botones = debugElement.queryAll(By.css('button'));

    expect(botones[0].attributes['ng-reflect-router-link']).toBe('/inicio');
    expect(botones[1].attributes['ng-reflect-router-link']).toBe('/');
  });

  it('debería emitir "cerrar-sesion" al hacer clic en el botón Cerrar Sesión', (done) => {
    const botones = fixture.nativeElement.querySelectorAll('button');
    const botonCerrarSesion = botones[1];

    component.acciones$.pipe(take(1)).subscribe(valor => {
      expect(valor).toBe('cerrar-sesion');
      done();
    });

    botonCerrarSesion.click();
  });
});


