import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
login(usuario: string, password: string): Observable<boolean> {
        const valid = usuario === 'admin' && password === '123456';
        return of(valid);
    }
}
