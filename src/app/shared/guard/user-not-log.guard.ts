import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Observable, map, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class userNotLogGuard {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    return this.authService.isUserLoggedIn$.pipe(tap(isUserLoggedIn => {
      isUserLoggedIn && this.router.navigate(['home']);
    }), map(isUserLoggedIn =>
      !isUserLoggedIn
    ))
  }
}