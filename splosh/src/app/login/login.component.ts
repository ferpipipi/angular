import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  login() {
    const userData = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>('http://localhost/backend/database/login.php', userData)
      .subscribe(response => {
        if (response.status === 'success') {
          alert('Inicio de sesión exitoso');
          // Puedes redirigir al home
        } else {
          alert('Correo o contraseña incorrectos');
        }
      }, error => {
        console.error('Error:', error);
      });
  }
}
