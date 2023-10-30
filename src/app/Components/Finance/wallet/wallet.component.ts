import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  user = new FormControl([]);
  userList: string[] = [];
  selectedUsers: string[] = [];

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.firestore.collection('users').valueChanges().subscribe((users: any) => {
      this.userList = users.map(user => user.email);
    });

    this.user.valueChanges.subscribe((selectedUsers: string[]) => {
      this.selectedUsers = selectedUsers;
    });
  }

  printSelectedUsers() {
    console.log('Wybrani użytkownicy:', this.selectedUsers);
  }
}
