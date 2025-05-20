import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ContenidoService {
    private apiUrl = environment.apiURL;

    constructor(private http: HttpClient) {}

    // Petición GET al endpoint de contenidos
    obtenerContenidos(): Observable<any> {
        return this.http.get(`${this.apiUrl}/api/Contenido`);
    }
}