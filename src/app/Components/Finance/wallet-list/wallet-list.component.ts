import { Component, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.css']
})
export class WalletListComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private firestore: AngularFirestore) { }

  wallet = new FormControl([]);
  walletList: string[] = [];
  selectedWallet: string[] = [];


  ngOnInit() {
    this.firestore.collection('finances').valueChanges().subscribe((finances: any) => {
      this.walletList = finances.map(wallet => wallet.name);
    });

    this.wallet.valueChanges.subscribe((selectedWallet: string[]) => {
      this.selectedWallet = selectedWallet;
    });
  }


  onCancelClick(): void {
    this.data.dialogRef.close();
  }

}
