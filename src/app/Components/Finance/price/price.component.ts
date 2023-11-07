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
  whoPaid: any;

  walletInfo: any;
  ownersList: User[] = []; 


  constructor(
    private walletService: WalletService,
  ) {}

  ngOnInit() {
    this.walletInfo = this.walletService.getSelectedWallet().people;
    this.ownersList = this.walletInfo.map((people: any) => ({ userId: people.userId, email: people.email }));
  }


  addPrice() {
    console.log('Info:', this.cost, this.description);
    this.walletService.setCost(this.cost);
    this.walletService.setDescription(this.description)
    this.walletService.setWhoPaid(this.whoPaid)
    this.walletService.saveCostToFirestore(this.walletService.getSelectedWallet().walletId);
  }
}

