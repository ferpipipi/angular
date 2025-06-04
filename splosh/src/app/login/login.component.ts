import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      alert('Por favor ingresa correo y contraseña');
      return;
    }

    const userData = {
      email: this.email,
      password: this.password
    };

    this.http.post<{ status: string; message?: string }>('http://localhost:5000/api/auth/login', userData)
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.router.navigate(['/home']); 
          } else {
            alert('Credenciales incorrectas. Intenta nuevamente.');
          }
        },
        error: (error) => {
          console.error('Error en login:', error);
          alert('Error al iniciar sesión. Verifica tu conexión o intenta más tarde.');
        }
      });
  }

}