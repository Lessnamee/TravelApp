import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { WalletComponent } from '../wallet/wallet.component';

@Component({
  selector: 'see-wallet',
  templateUrl: './see-wallet.component.html',
  styleUrls: ['./see-wallet.component.css']
})
export class SeeWalletComponent {


  finances: any[] = [];
  memoriesEmpty: boolean = false;


  constructor(
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


  deleteWallet(wallet) {
    const walletID = wallet.walletId;
  
    if (walletID) {
      this.afs.collection('finances', ref => ref.where('walletId', '==', walletID))
        .get()
        .subscribe(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete().then(() => {
              console.log('Portfel został pomyślnie usunięty.');
            }).catch(error => {
              console.error('Błąd podczas usuwania portfela: ', error);
            });
          });
        });
    } else {
      console.warn('Nieprawidłowy identyfikator portfela.');
    }
  }
  
}
