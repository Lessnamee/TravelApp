import { Component} from '@angular/core';
import { WalletService } from 'src/app/shared/services/wallet.service';

@Component({
  selector: 'wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent{
  walletName: string;

  constructor(private walletService: WalletService) {
    const selectedWallet = this.walletService.getSelectedWallet();

    if (selectedWallet) {
      this.walletName = selectedWallet.name;
    }
  }
  
}
