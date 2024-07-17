import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() {}

  signOut(): void {
    if (typeof window !== 'undefined') {
      window.sessionStorage.clear();
    }
  }

  public saveToken(token: string): void {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(TOKEN_KEY);
      window.sessionStorage.setItem(TOKEN_KEY, token);
    }
  }

  public getToken(): string | null {
    return typeof window !== 'undefined' ? window.sessionStorage.getItem(TOKEN_KEY) : null;
  }

  public saveUser(user: any): void {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(USER_KEY);
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  public getUser(): any {
    const user = typeof window !== 'undefined' ? window.sessionStorage.getItem(USER_KEY) : null;
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
