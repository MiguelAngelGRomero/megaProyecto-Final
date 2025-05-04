import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HubComponent } from './hub.component';
import { By } from '@angular/platform-browser';
import { take } from 'rxjs';
import { Component } from '@angular/core';


@Component({ template: '' })
class DummyComponent {}

describe('HubComponent', () => {
  let component: HubComponent;
  let fixture: ComponentFixture<HubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'inicio', component: DummyComponent },
          { path: 'favoritos', component: DummyComponent },
          { path: 'series', component: DummyComponent },
          { path: 'peliculas', component: DummyComponent },
          { path: 'configuracion', component: DummyComponent }
        ]),
        HubComponent
      ],
      declarations: [DummyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar 5 botones de navegación', () => {
    const botones = fixture.nativeElement.querySelectorAll('button');
    expect(botones.length).toBe(5);
  });

  it('debería tener los routerLink correctos en los botones', () => {
    const debugElement = fixture.debugElement;
    const botones = debugElement.queryAll(By.css('button'));

    expect(botones[0].attributes['ng-reflect-router-link']).toBe('/inicio');
    expect(botones[1].attributes['ng-reflect-router-link']).toBe('/favoritos');
    expect(botones[2].attributes['ng-reflect-router-link']).toBe('/series');
    expect(botones[3].attributes['ng-reflect-router-link']).toBe('/peliculas');
    expect(botones[4].attributes['ng-reflect-router-link']).toBe('/configuracion');
  });

  it('debería emitir la ruta al hacer clic en un botón', (done) => {
    const compiled = fixture.nativeElement as HTMLElement;
    const botonInicio = compiled.querySelector('button');

    component.navigationClicks$.pipe(take(1)).subscribe(ruta => {
      expect(ruta).toBe('/inicio');
      done();
    });

    botonInicio?.click();
  });
});

