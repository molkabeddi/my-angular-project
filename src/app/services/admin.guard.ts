import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ERole } from '../services/role.enum';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.hasRole(ERole.ROLE_ADMIN)) {
        return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}