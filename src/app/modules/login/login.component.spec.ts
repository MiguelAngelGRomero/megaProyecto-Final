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
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]), // Configura rutas vacías
        LoginComponent // Si es standalone
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        // No proveemos un mock manual del Router
      ]
    }).compileComponents();

    router = TestBed.inject(Router); // Obtenemos el Router del TestBed
    spyOn(router, 'navigate').and.callThrough(); // Espiamos el método navigate
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear', () => {
    expect(component).toBeTruthy();
  });

  it('Debe llamar a authService.login y navegar en caso de éxito.', () => {
    authServiceSpy.login.and.returnValue(of(true));
    component.loginForm.setValue({ usuario: 'test', password: '123456' });

    component.login();

    expect(authServiceSpy.login).toHaveBeenCalledWith('test', '123456');
    expect(router.navigate).toHaveBeenCalledWith(['/inicio']);
  });

  it('Debería configurar errorMessage en caso de inicio de sesión fallido.', () => {
    authServiceSpy.login.and.returnValue(of(false));
    component.loginForm.setValue({ usuario: 'wrong', password: '123456' });

    component.login();

    expect(authServiceSpy.login).toHaveBeenCalled();
    expect(component.errorMessage).toBe('Usuario o contraseña incorrectos');
    expect(router.navigate).not.toHaveBeenCalled(); // Usamos router en lugar de routerSpy
  });
});


  