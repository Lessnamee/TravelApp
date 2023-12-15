import { Component, Input } from '@angular/core';
import { WalletService } from 'src/app/shared/services/wallet.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { PackingListService } from 'src/app/shared/services/packing-list.service';
import { ActivatedRoute } from '@angular/router';
import { WalletComponent } from '../wallet/wallet.component';

@Component({
  selector: 'see-wallet',
  templateUrl: './see-wallet.component.html',
  styleUrls: ['./see-wallet.component.css']
})
export class SeeWalletComponent {

  // walletName: string;
  // costs: Array<string>;
  // descriptions: Array<string>;
  // whoPaid: Array<string>;
  // currentUserEmail: string;
  // numberOfPeople: number;


  // constructor(
  //   private walletService: WalletService,
  //   private authService: AuthService,
  //     ) {

  //   const selectedWallet = this.walletService.getSelectedWallet();

  //   if (selectedWallet) {
  //     this.walletName = selectedWallet.name;
  //     this.costs = selectedWallet.costs.map(cost => cost.cost);
  //     this.descriptions = selectedWallet.costs.map(cost => cost.description);
  //     this.whoPaid = selectedWallet.costs.map(cost => cost.whoPaid.email);
  //     this.currentUserEmail = this.authService.getLoggedInUser().email;
  //     this.numberOfPeople = selectedWallet.people.length;
  //   }
  // }



  // calculateRepayment(index: number): number {
  //   const totalCost = parseFloat(this.costs[index]);

  //   if (this.whoPaid[index] === this.currentUserEmail) {
  //     return totalCost * ((this.numberOfPeople - 1) / this.numberOfPeople);
  //   } else {
  //     return totalCost / this.numberOfPeople;
  //   }
  // }

  // calculateDebt(index: number): number {
  //   const totalCost = parseFloat(this.costs[index]);

  //   if (this.whoPaid[index] !== this.currentUserEmail) {
  //     return totalCost / this.numberOfPeople;
  //   } else {
  //     return 0;
  //   }
  // }

  finances: any[] = [];
  memoriesEmpty: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    public dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadAllMemories()
  }


  loadAllMemories() {
    const userId = this.authService.getLoggedInUser().uid;
    this.afs.collection('finances', ref =>
      ref.where('userId', '==', userId)
    ).valueChanges().subscribe(finances => {
      this.finances = finances;
      this.memoriesEmpty = this.finances.length === 0;
      console.log('Finances:', finances);
    });
  }
  

  openDialog(wallet: any) {
    const dialogRef = this.dialog.open(WalletComponent, { data: {wallet} });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

