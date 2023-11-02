import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' 
})
export class WalletService {
  private selectedWallet: any;

  setSelectedWallet(wallet: any) {
    this.selectedWallet = wallet;
  }

  getSelectedWallet() {
    return this.selectedWallet;
  }
}

