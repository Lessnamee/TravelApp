import { Injectable} from '@angular/core';
import { User } from '../services/user';
import {
  AngularFirestore,
} from '@angular/fire/compat/firestore';
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
    public afs: AngularFirestore, 
    public afAuth: AngularFireAuth,
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

        const personData = {
          email: result.user.email,
          userId: result.user.uid
        };
        
        
          this.afs.collection('users').add(personData).then(docRef => {
            console.log('Dodano nowy dokument z ID: ', docRef.id);
          }).catch(error => {
            console.error('Błąd podczas dodawania dokumentu: ', error);
          });


  
      } catch (error) {
        window.alert(error.message);
      }
  }
  


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
    return this.afAuth.signOut()
    .then(() => {
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

  getLoggedInUser(): User | null {
    return this.userData$.value;
  }
}
