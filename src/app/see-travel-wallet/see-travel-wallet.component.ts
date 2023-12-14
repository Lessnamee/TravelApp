import { Component, Input } from '@angular/core';
import { WalletService } from '../shared/services/wallet.service';
import { AuthService } from '../shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'see-travel-wallet',
  templateUrl: './see-travel-wallet.component.html',
  styleUrls: ['./see-travel-wallet.component.css']
})
export class SeeTravelWalletComponent {

  @Input() travelID: string;

  walletName: string;
  costs: Array<string>;
  descriptions: Array<string>;
  whoPaid: Array<string>;
  currentUserEmail: string;
  numberOfPeople: number;

  walletID

  ngOnInit(): void {
    if (this.travelID) {
      this.findWalletByTravelID();
    }
  }

  constructor(
    private walletService: WalletService,
    private authService: AuthService,
    private firestore: AngularFirestore
      ) {}

  findWalletByTravelID(): void {
    this.firestore.collection('travel', ref => ref.where('travelId', '==', this.travelID))
      .get()
      .subscribe(querySnapshot => {
        if (!querySnapshot.empty) {
          const travelDoc = querySnapshot.docs[0];
          const walletID = travelDoc.get('walletId');

          if (walletID) {
            this.findWalletByID(walletID);
          } else {
            console.error('Błąd: Brak walletId w podróży o ID: ' + this.travelID);
          }
        } else {
          console.error('Błąd: Brak danych o podróży o ID: ' + this.travelID);
        }
      });
  }

  findWalletByID(walletID: string): void {
    this.firestore.collection('finances', ref => ref.where('walletId', '==', walletID))
      .get()
      .subscribe(querySnapshot => {
        if (!querySnapshot.empty) {
          const financesDoc = querySnapshot.docs[0];
          const selectedWallet = {
            id: financesDoc.id,
            name: financesDoc.get('name'),
            costs: financesDoc.get('costs') || [],
            people: financesDoc.get('people')
          };
          this.walletService.setSelectedWallet(selectedWallet);
          this.updateComponentData();
        } else {
          console.error('Błąd: Brak danych w finansach dla walletId: ' + walletID);
        }
      });
  }

  updateComponentData(): void {
    const selectedWallet = this.walletService.getSelectedWallet();

    if (selectedWallet && selectedWallet.costs && Array.isArray(selectedWallet.costs)) {
        this.walletName = selectedWallet.name;
        this.costs = selectedWallet.costs.map(cost => cost.cost);
        this.descriptions = selectedWallet.costs.map(cost => cost.description);
        this.whoPaid = selectedWallet.costs.map(cost => cost.whoPaid.email);
        this.currentUserEmail = this.authService.getLoggedInUser().email;
        this.numberOfPeople = selectedWallet.people.length;
    }
  }



  calculateRepayment(index: number): number {
    const totalCost = parseFloat(this.costs[index]);

    if (this.whoPaid[index] === this.currentUserEmail) {
      return totalCost * ((this.numberOfPeople - 1) / this.numberOfPeople);
    } else {
      return totalCost / this.numberOfPeople;
    }
  }

  calculateDebt(index: number): number {
    const totalCost = parseFloat(this.costs[index]);

    if (this.whoPaid[index] !== this.currentUserEmail) {
      return totalCost / this.numberOfPeople;
    } else {
      return 0;
    }
  }
}

