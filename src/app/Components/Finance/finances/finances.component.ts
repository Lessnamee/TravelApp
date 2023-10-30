import { Component } from '@angular/core';
import { AddWalletComponent } from '../add-wallet/add-wallet.component';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';
import { WalletListComponent } from 'src/app/Components/Finance/wallet-list/wallet-list.component';


@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.css'],
})
export class FinancesComponent {

  constructor(
    public dialog: MatDialog,
    private afs: AngularFirestore,
    private authService: AuthService
  ) { }

  addWallet() {
    const dialogRef = this.dialog.open(AddWalletComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      const financeData = {
        walletId: this.afs.createId(),
        name: result,
        userId: this.authService.getLoggedInUser().uid
      };

      this.afs.collection('finances').add(financeData).then(docRef => {
        console.log('Dodano nowy dokument z ID: ', docRef.id);
      }).catch(error => {
        console.error('Błąd podczas dodawania dokumentu: ', error);
      });

    });
  }

  editWallet() {
    const dialogRef = this.dialog.open(WalletListComponent);

  }
}
