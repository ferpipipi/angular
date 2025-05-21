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
    console.log('login funcionó');

    if (!this.email || !this.password) {
      alert('Por favor ingresa correo y contraseña');
      return;
    }

    const userData = {
      email: this.email,
      password: this.password
    };

    this.http.post<{ status: string }>('https://localhost:5001/api/auth/login', userData)
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            alert('Inicio de sesión exitoso');
            this.router.navigate(['/home']);
          } else {
            alert('Correo o contraseña incorrectos');
          }
        },
        error: (error) => {
          console.error('Error en el servidor:', error);
          alert('Error en el servidor, intenta más tarde');
        }
      });
  }
}
