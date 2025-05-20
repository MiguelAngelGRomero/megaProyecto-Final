import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = environment.apiURL;

    constructor(private http: HttpClient) {}

    login(correo: string, contra: string): Observable<any> {
        const body = { correo, contra };
        return this.http.post(`${this.apiUrl}/api/Usuario/login`, body);
    }
}
