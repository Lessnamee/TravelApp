import { Injectable} from '@angular/core';
import { User } from '../services/user';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userData$: BehaviorSubject<User | null> = new BehaviorSubject(null);

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
  ) {
    this.checkUserExistenceInSession();
  }

  async SignIn(email: string, password: string): Promise<void> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.setUserForApp(result.user);
      this.router.navigate(['home']);
    } catch (error) {
      window.alert(error.message);
    }
  }

  async SignUp(email: string, password: string): Promise<void>  {
      try {
        const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
        this.setUserForApp(result.user);
        this.router.navigate(['home']);
      } catch (error) {
        window.alert(error.message);
      }
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.isUserLoggedIn$.next(false);
      this.router.navigate(['start']);
    });
  }

  private setUserForApp(user: any): void {
    const userToSet: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    localStorage.setItem('user', JSON.stringify(userToSet));
    this.userData$.next(userToSet);
    this.isUserLoggedIn$.next(true);
  }

  private checkUserExistenceInSession(): void {
    const userFromSession: string | null = localStorage.getItem('user');
    if (userFromSession) {
      this.userData$.next(JSON.parse(userFromSession));
      this.isUserLoggedIn$.next(true);
    }
  }
}
