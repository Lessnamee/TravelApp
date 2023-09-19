import { Injectable } from '@angular/core';
import { Observable, Subject, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isUserLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  constructor() {
    setTimeout(() => {
      this.isUserLoggedInSubject.next(true);
    }, 5000);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isUserLoggedInSubject.asObservable();
  }
}
