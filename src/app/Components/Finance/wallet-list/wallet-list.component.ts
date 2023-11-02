import { Component, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WalletService } from 'src/app/shared/services/wallet.service';

@Component({
  selector: 'wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.css']
})
export class WalletListComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
  private firestore: AngularFirestore, 
  private router: Router,  
  private walletService: WalletService
  ) { }
  
  wallet = new FormControl<string>('');
  walletList: any[] = []; 
  selectedWallet: any = null; 

  ngOnInit() {
    this.firestore.collection('finances').valueChanges().subscribe((finances: any) => {
      this.walletList = finances; 
    });

    this.wallet.valueChanges.subscribe((selectedWallet: string) => {
      this.selectedWallet = this.walletList.find(wallet => wallet.name === selectedWallet);
    });
  }

  chooseWallet() {
    if (this.selectedWallet) {
      console.log('Pełne informacje o wybranym portfelu:', this.selectedWallet);
      this.walletService.setSelectedWallet(this.selectedWallet);
      this.router.navigate(['/wallet']);
    } else {
      console.log('Nie wybrano portfela.');
    }
  }
}
