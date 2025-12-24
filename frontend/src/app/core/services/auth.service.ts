import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginRequest } from '../../shared/models';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly API_URL = environment.apiUrl;
    private readonly TOKEN_KEY = 'jwt_token';
    private readonly EMAIL_KEY = 'user_email';

    constructor(private http: HttpClient) { }

    login(credentials: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.API_URL}/auth/login`, credentials).pipe(
            tap(response => {
                this.saveToken(response.token);
                this.saveEmail(response.email);
            })
        );
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.EMAIL_KEY);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    getEmail(): string | null {
        return localStorage.getItem(this.EMAIL_KEY);
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        return !!token;
    }

    private saveToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    private saveEmail(email: string): void {
        localStorage.setItem(this.EMAIL_KEY, email);
    }
}
