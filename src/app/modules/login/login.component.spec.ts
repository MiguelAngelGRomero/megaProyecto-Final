import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: Router; // Usamos el Router real proporcionado por RouterTestingModule

  beforeEach(waitForAsync(() => {
    // Se crea un espía para el servicio AuthService con el método 'login'
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, // Importa el módulo de formularios reactivos
        RouterTestingModule.withRoutes([]), // Configura rutas vacías para el router
        LoginComponent // Si el componente es standalone, se agrega directamente
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }, // Proporciona el espía de AuthService
        // No necesitamos un espía manual para Router, ya que RouterTestingModule lo maneja
      ]
    }).compileComponents();

    router = TestBed.inject(Router); // Obtenemos el servicio Router del TestBed
    spyOn(router, 'navigate').and.callThrough(); // Espiamos el método navigate para verificar la navegación
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detecta los cambios en la vista después de la creación del componente
  });

  // Verifica que el componente se haya creado correctamente
  it('Debe crear', () => {
    expect(component).toBeTruthy();
  });

  // Verifica que al llamar al método 'login', se haga la llamada al servicio 'authService.login' y que navegue al inicio si el login es exitoso
  it('Debe llamar a authService.login y navegar en caso de éxito.', () => {
    authServiceSpy.login.and.returnValue(of(true)); // Simula una respuesta exitosa del login
    component.loginForm.setValue({ usuario: 'test', password: '123456' }); // Establece los valores del formulario

    component.login(); // Llama al método de login

    // Verifica que se haya llamado al método 'login' con los valores correctos
    expect(authServiceSpy.login).toHaveBeenCalledWith('test', '123456');
    // Verifica que se haya navegado a la página de inicio
    expect(router.navigate).toHaveBeenCalledWith(['/inicio']);
  });

  // Verifica que al fallar el login, se configure el mensaje de error y no se navegue a ninguna página
  it('Debería configurar errorMessage en caso de inicio de sesión fallido.', () => {
    authServiceSpy.login.and.returnValue(of(false)); // Simula una respuesta fallida del login
    component.loginForm.setValue({ usuario: 'wrong', password: '123456' }); // Establece valores de formulario incorrectos

    component.login(); // Llama al método de login

    // Verifica que el método 'login' haya sido llamado
    expect(authServiceSpy.login).toHaveBeenCalled();
    // Verifica que el mensaje de error haya sido configurado correctamente
    expect(component.errorMessage).toBe('Usuario o contraseña incorrectos');
    // Verifica que no se haya navegado a ninguna página
    expect(router.navigate).not.toHaveBeenCalled();
  });
});



  