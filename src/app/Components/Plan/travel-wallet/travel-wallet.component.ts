import { Component, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { WalletService } from 'src/app/shared/services/wallet.service';

@Component({
  selector: 'travel-wallet',
  templateUrl: './travel-wallet.component.html',
  styleUrls: ['./travel-wallet.component.css']
})
export class TravelWalletComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private firestore: AngularFirestore, 
    private router: Router,  
    private walletService: WalletService,
    private authService: AuthService
  ) { }
  
  wallet = new FormControl<string>('');
  walletList: any[] = []; 
  selectedWallet: any = null; 

  ngOnInit() {
    this.authService.userData$.subscribe(user => {
      if (user) {
        const loggedInUserId = user.uid;

        this.firestore.collection('finances').snapshotChanges().subscribe((finances: any) => {
          this.walletList = finances.map(fin => {
            const data = fin.payload.doc.data();
            const id = fin.payload.doc.id;
            
            const people = data.people ?? [];
            const userId = data.userId ?? '';

            return { id, ...data, people, userId };
          }).filter(wallet => 
            wallet.people.some(person => person.userId === loggedInUserId) || wallet.userId === loggedInUserId
          );
        });
      }
    });

    this.wallet.valueChanges.subscribe((selectedWallet: string) => {
      this.selectedWallet = this.walletList.find(wallet => wallet.name === selectedWallet);
    });
  }

  chooseWallet() {
    if (this.selectedWallet) {
      console.log('Pełne informacje o wybranym portfelu:', this.selectedWallet);
      this.walletService.setSelectedWallet(this.selectedWallet);
      this.router.navigate(['/see-wallet']);
    } else {
      console.log('Nie wybrano portfela.');
    }
  }

  addWallet(){
    
  }

}
