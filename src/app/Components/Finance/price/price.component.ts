import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/shared/services/user';
import { WalletService } from 'src/app/shared/services/wallet.service';

@Component({
  selector: 'price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent {
  cost: number;
  description: string;

  user = new FormControl([]);
  userList: User[] = []; // Używaj typu User zamiast string[]
  selectedUsers: User[] = []; // Używaj typu User zamiast string[]
  walletUsers: User[] = [];


  constructor(
    private walletService: WalletService
  ) {}


  addPrice() {
    console.log('Info:', this.cost, this.description);
    this.walletService.setCost(this.cost);
    this.walletService.setDescription(this.description)
    this.walletService.saveCostToFirestore(this.walletService.getSelectedWallet().walletId);
  }
}

