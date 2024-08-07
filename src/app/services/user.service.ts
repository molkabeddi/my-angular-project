import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ERole } from './role.enum';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId: string = ''; // Initialize with an empty string

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getArticles(): Observable<any[]> {
    return this.http.get<any[]>(API_URL + 'articles');
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  getUserId(): string {
    return this.userId;
  }

  getUserRole(): ERole {
    const userRoleString = localStorage.getItem('userRole');
    if (userRoleString) {
      switch (userRoleString) {
        case 'USER':
          return ERole.ROLE_USER;
        case 'MODERATOR':
          return ERole.ROLE_MODERATOR;
        case 'ADMIN':
          return ERole.ROLE_ADMIN;
        default:
          return ERole.ROLE_USER; // default role
      }
    } else {
      return ERole.ROLE_USER; // default role
    }
  }
}