// Importaciones necesarias para Angular, formularios reactivos, enrutamiento y servicio de autenticación
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RouterModule } from '@angular/router';

// Declaración del componente LoginComponent como componente standalone
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // Formulario de inicio de sesión y mensaje de error
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,         // Constructor de formularios
    private authService: AuthService, // Servicio de autenticación
    private router: Router            // Navegación entre rutas
  ) {
    // Inicialización del formulario con validaciones
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required]],                         // Campo requerido
      password: ['', [Validators.required, Validators.minLength(6)]] // Requiere mínimo 6 caracteres
    });
  }

  // Método que se ejecuta al enviar el formulario
  login() {
    if (this.loginForm.invalid) return; // Si el formulario es inválido, no hace nada

    const { usuario, password } = this.loginForm.value;

    // Llama al servicio de autenticación
    this.authService.login(usuario, password).subscribe(success => {
      if (success) {
        // Si es exitoso, redirige al inicio
        this.router.navigate(['/inicio']);
      } else {
        // Si falla, muestra mensaje de error
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    });
  }

  // Getters para acceder fácilmente a los controles del formulario
  get usuario() {
    return this.loginForm.get('usuario');
  }

  get password() {
    return this.loginForm.get('password');
  }
}


