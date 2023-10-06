import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isUserLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  isLoggedIn(): Observable<boolean> {
    return this.isUserLoggedInSubject.asObservable();
  }


  login(){
    this.isUserLoggedInSubject.next(true);
    window.location.reload();
  }

  logout() {
    this.isUserLoggedInSubject.next(false);
    window.location.reload();
  }
}
