import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private selectedUsers: any;


  constructor(private firestore: AngularFirestore) {}


  setSelectedUsers(users: any) {
    this.selectedUsers = users;
  }

  getSelectedUsers() {
    return this.selectedUsers;
  }

  getAllUsers(): Observable<User[]> {
    return this.firestore.collection<User>('users').valueChanges();
  }

  getUserById(userId: string): Observable<User> {
    return this.firestore.doc<User>(`users/${userId}`).valueChanges();
  }



  saveUsersToFirestore(walletId: string) {
    const peopleData = {
      people: this.selectedUsers
    };

    this.firestore.collection('finances', ref => ref.where('walletId', '==', walletId))
      .get()
      .subscribe(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({ people: peopleData.people }).then(() => {
            console.log('Zaktualizowano dane w Firestore');
          }).catch(error => {
            console.error('Błąd podczas aktualizacji danych w Firestore:', error);
          });
        });
      });
  }
  
  
}
