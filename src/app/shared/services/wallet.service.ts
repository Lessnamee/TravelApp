import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root' 
})
export class WalletService {
  private selectedWallet: any;
  private addCost: number;
  private description: string;

  constructor(
    private firestore: AngularFirestore,
  ) {}

  setSelectedWallet(wallet: any) {
    this.selectedWallet = wallet;
  }

  getSelectedWallet() {
    return this.selectedWallet;
  }

  setCost(cost: number) {
    this.addCost = cost;
  }

  getCost() {
    return this.addCost;
  }

  setDescription(description: string) {
    this.description = description;
  }

  getDescription() {
    return this.description;
  }

  
  saveCostToFirestore(walletId: string) {
    const costData = {
      cost: this.addCost,
      description: this.description
    };
  
    this.firestore.collection('finances', ref => ref.where('walletId', '==', walletId))
      .get()
      .subscribe(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({ costs: costData }).then(() => {
            console.log('Zaktualizowano dane w Firestore');
          }).catch(error => {
            console.error('Błąd podczas aktualizacji danych w Firestore:', error);
          });
        });
      });
  }
}

