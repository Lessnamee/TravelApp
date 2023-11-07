import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root' 
})
export class WalletService {
  private selectedWallet: any;
  private addCost: number;
  private description: string;
  private whoPaid: any;

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

  setWhoPaid(whoPaid: any) {
    this.whoPaid = whoPaid;
  }

  getWhoPaid() {
    return this.whoPaid;
  }


  saveCostToFirestore(walletId: string) {
    const newCost = {
      cost: this.addCost,
      description: this.description,
      whoPaid: this.whoPaid
    };
  
    this.firestore.collection('finances', ref => ref.where('walletId', '==', walletId))
      .get()
      .subscribe(querySnapshot => {
        querySnapshot.forEach(doc => {
          let currentCosts = doc.get('costs');
  
          if (!Array.isArray(currentCosts)) {
            currentCosts = [];
          }
  
          currentCosts.push(newCost);
  
          doc.ref.update({ costs: currentCosts }).then(() => {
            console.log('Zaktualizowano dane w Firestore');
          }).catch(error => {
            console.error('Błąd podczas aktualizacji danych w Firestore:', error);
          });
        });
      });
  }
  
  
}

