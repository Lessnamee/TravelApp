import { Component, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent{
 
  walletName: string;
  costs: Array<string>;
  descriptions: Array<string>;
  whoPaid: Array<string>;
  currentUserEmail: string;
  numberOfPeople: number;

  visibleCost: string[] = [];
  

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public data: any
      ) {

      this.walletName = data.wallet.name;
      this.costs = data.wallet.costs.map(cost => cost.cost);
      this.descriptions = data.wallet.costs.map(cost => cost.description);
      this.whoPaid = data.wallet.costs.map(cost => cost.whoPaid.email);
      this.currentUserEmail = this.authService.getLoggedInUser().email;
      this.numberOfPeople = data.wallet.people.length;
    
  }


  removeCost(cost) {
    const walletID = this.data.wallet.walletId;
  
    const updatedCosts = this.data.wallet.costs.filter(item => item.cost !== cost);
  
    this.firestore.collection('finances', ref => ref.where('walletId', '==', walletID))
      .get()
      .subscribe(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({ costs: updatedCosts }).then(() => {
            console.log('Zaktualizowano dokument w Firebase po usunięciu kosztu.');
            this.data.wallet.costs = updatedCosts.slice(); 
            this.costs = updatedCosts.slice();
          }).catch(error => {
            console.error('Błąd podczas aktualizowania dokumentu: ', error);
          });
        });
      });
  }
  
  
  



  calculateRepayment(index: number): number {
    const totalCost = parseFloat(this.costs[index]);

    if (this.whoPaid[index] === this.currentUserEmail) {
      return totalCost * ((this.numberOfPeople - 1) / this.numberOfPeople);
    } else {
      return totalCost / this.numberOfPeople;
    }
  }

  calculateDebt(index: number): number {
    const totalCost = parseFloat(this.costs[index]);

    if (this.whoPaid[index] !== this.currentUserEmail) {
      return totalCost / this.numberOfPeople;
    } else {
      return 0;
    }
  }
  
}
