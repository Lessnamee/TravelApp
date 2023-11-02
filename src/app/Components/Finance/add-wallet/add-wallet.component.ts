import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.component.html',
  styleUrls: ['./add-wallet.component.css']
})
export class AddWalletComponent {

  walletName: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}
