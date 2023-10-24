// import { Component } from '@angular/core';
// import { AddWalletComponent } from '../add-wallet/add-wallet.component';
// import { MatDialog } from '@angular/material/dialog';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-finances',
//   templateUrl: './finances.component.html',
//   styleUrls: ['./finances.component.css'],
// })
// export class FinancesComponent {

//   constructor(public dialog: MatDialog, private afs: AngularFirestore, private router: Router) { }

//   addWallet() {
//     const dialogRef = this.dialog.open(AddWalletComponent);

//     dialogRef.afterClosed().subscribe(result => {
//       console.log(`Dialog result: ${result}`);
//       const financeData = {
//         name: result,
//       };

//       this.afs.collection('finances').add(financeData).then(docRef => {
//         console.log('Dodano nowy dokument z ID: ', docRef.id);
//       }).catch(error => {
//         console.error('Błąd podczas dodawania dokumentu: ', error);
//       });

//       this.router.navigate(['/wallet']);

//     });

//   }
// }

import { Component } from '@angular/core';
import { AddWalletComponent } from '../add-wallet/add-wallet.component';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.css'],
})
export class FinancesComponent {

  constructor(
    public dialog: MatDialog,
    private afs: AngularFirestore,
    private router: Router,
    private authService: AuthService // Wstrzyknij AuthService
  ) { }

  addWallet() {
    const dialogRef = this.dialog.open(AddWalletComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      const financeData = {
        name: result,
        userId: this.authService.getLoggedInUser().uid // Dodaj userID zalogowanego użytkownika
      };

      this.afs.collection('finances').add(financeData).then(docRef => {
        console.log('Dodano nowy dokument z ID: ', docRef.id);
      }).catch(error => {
        console.error('Błąd podczas dodawania dokumentu: ', error);
      });

      this.router.navigate(['/wallet']);
    });
  }
}
