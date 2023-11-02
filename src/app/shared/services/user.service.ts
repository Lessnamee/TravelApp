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

  // saveUsersToFirestore() {
  //   const peopleData = {
  //     people: this.selectedUsers
  //   };

  //   // Dodaj obiekt "people" do kolekcji "selectedUsers"
  //   this.firestore.collection('selectedUsers').add(peopleData).then(() => {
  //     console.log('Zapisano wybranych użytkowników do Firestore');
  //   }).catch(error => {
  //     console.error('Błąd podczas zapisywania danych do Firestore:', error);
  //   });
  // }

  saveUsersToFirestore(walletId: string) {
    const peopleData = {
      people: this.selectedUsers
    };

    // Utwórz zapytanie do bazy danych Firestore, aby znaleźć dokument z pasującym walletId
    this.firestore.collection('finances', ref => ref.where('walletId', '==', walletId))
      .get()
      .subscribe(querySnapshot => {
        querySnapshot.forEach(doc => {
          // Aktualizuj dokument z danymi z peopleData
          doc.ref.update({ people: peopleData.people }).then(() => {
            console.log('Zaktualizowano dane w Firestore');
          }).catch(error => {
            console.error('Błąd podczas aktualizacji danych w Firestore:', error);
          });
        });
      });
  }
  
}
