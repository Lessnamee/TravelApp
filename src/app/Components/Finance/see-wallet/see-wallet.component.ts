import { Component } from '@angular/core';
import { WalletService } from 'src/app/shared/services/wallet.service';

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

  constructor(private walletService: WalletService) {
    const selectedWallet = this.walletService.getSelectedWallet();

    if (selectedWallet) {
      this.walletName = selectedWallet.name;
      this.costs = selectedWallet.costs.map(cost => cost.cost);
      this.descriptions = selectedWallet.costs.map(cost => cost.description);
      this.whoPaid = selectedWallet.costs.map(cost => cost.whoPaid.email);
    }
  }

}
