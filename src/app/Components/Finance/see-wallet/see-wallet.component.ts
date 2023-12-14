import { Component, Input } from '@angular/core';
import { WalletService } from 'src/app/shared/services/wallet.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'see-wallet',
  templateUrl: './see-wallet.component.html',
  styleUrls: ['./see-wallet.component.css']
})
export class SeeWalletComponent {

  walletName: string;
  costs: Array<string>;
  descriptions: Array<string>;
  whoPaid: Array<string>;
  currentUserEmail: string;
  numberOfPeople: number;
  

  constructor(
    private walletService: WalletService,
    private authService: AuthService,
      ) {

    const selectedWallet = this.walletService.getSelectedWallet();

    if (selectedWallet) {
      this.walletName = selectedWallet.name;
      this.costs = selectedWallet.costs.map(cost => cost.cost);
      this.descriptions = selectedWallet.costs.map(cost => cost.description);
      this.whoPaid = selectedWallet.costs.map(cost => cost.whoPaid.email);
      this.currentUserEmail = this.authService.getLoggedInUser().email;
      this.numberOfPeople = selectedWallet.people.length;
    }
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

