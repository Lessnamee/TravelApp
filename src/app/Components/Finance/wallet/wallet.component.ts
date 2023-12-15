import { Component, Inject, Input} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { WalletService } from 'src/app/shared/services/wallet.service';

@Component({
  selector: 'wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent{
  // walletName: string;

  // constructor(private walletService: WalletService) {
  //   const selectedWallet = this.walletService.getSelectedWallet();

  //   if (selectedWallet) {
  //     this.walletName = selectedWallet.name;
  //   }
  // }

  
  walletName: string;
  costs: Array<string>;
  descriptions: Array<string>;
  whoPaid: Array<string>;
  currentUserEmail: string;
  numberOfPeople: number;
  

  constructor(
    private walletService: WalletService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
      ) {



      this.walletName = data.wallet.name;
      this.costs = data.wallet.costs.map(cost => cost.cost);
      this.descriptions = data.wallet.costs.map(cost => cost.description);
      this.whoPaid = data.wallet.costs.map(cost => cost.whoPaid.email);
      this.currentUserEmail = this.authService.getLoggedInUser().email;
      this.numberOfPeople = data.wallet.people.length;
    
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
