import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/shared/services/user';
import { UserService } from 'src/app/shared/services/user.service';
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
  selectedWalletId: string; // Dodaj pole przechowujące wybrany walletId
  walletUsers: User[] = [];


  constructor(
    private firestore: AngularFirestore,
    private userService: UserService,
    private walletService: WalletService
  ) {}


  addPrice() {
    console.log('Cena:', this.cost);
    this.userService.setCost(this.cost);
    this.userService.saveCostToFirestore(this.selectedWalletId);
  }
}

