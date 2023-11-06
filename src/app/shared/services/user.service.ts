import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private selectedUsers: any;
  private addCost: any;


  constructor(private firestore: AngularFirestore) {}


  setSelectedUsers(users: any) {
    this.selectedUsers = users;
  }

  getSelectedUsers() {
    return this.selectedUsers;
  }

  setCost(cost: any) {
    this.addCost = cost;
  }

  getCost() {
    return this.addCost;
  }


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

  saveCostToFirestore(walletId: string) {
    const costData = {
      costs: this.addCost
    };

    // Utwórz zapytanie do bazy danych Firestore, aby znaleźć dokument z pasującym walletId
    this.firestore.collection('finances', ref => ref.where('walletId', '==', walletId))
      .get()
      .subscribe(querySnapshot => {
        querySnapshot.forEach(doc => {
          // Aktualizuj dokument z danymi z peopleData
          doc.ref.update({ cost: costData.costs }).then(() => {
            console.log('Zaktualizowano dane w Firestore');
          }).catch(error => {
            console.error('Błąd podczas aktualizacji danych w Firestore:', error);
          });
        });
      });
  }
  
}
