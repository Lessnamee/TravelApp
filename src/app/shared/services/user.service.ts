import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
