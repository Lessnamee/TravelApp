import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddPeopleComponent } from '../add-people/add-people.component';

@Component({
  selector: 'wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent {

  constructor(public dialog: MatDialog, private afs: AngularFirestore, private router: Router) { }
  expenseAmount: number;
  expenseDistribution: 'equal' | 'custom' = 'equal';
  people: string[] = []; 
  expenses: { person: string; amount: number }[] = []; 

  addPeople() {
    const dialogRef = this.dialog.open(AddPeopleComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      
    })
}



}



