import { Component, Input } from '@angular/core';
import { WalletService } from 'src/app/shared/services/wallet.service';
import { PriceComponent } from '../price/price.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-wallet',
  templateUrl: './app-wallet.component.html',
  styleUrls: ['./app-wallet.component.css']
})
export class AppWalletComponent {

  @Input() name: string;
  @Input() wallet;

  constructor(
    private walletService: WalletService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.walletService.setSelectedWallet(this.wallet);
  }


  openPriceDialog(event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(PriceComponent, {
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}