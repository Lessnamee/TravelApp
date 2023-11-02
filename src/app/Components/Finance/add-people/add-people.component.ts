// import { Component } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { FormControl } from '@angular/forms';
// import { UserService } from 'src/app/shared/services/user.service';

// @Component({
//   selector: 'add-people',
//   templateUrl: './add-people.component.html',
//   styleUrls: ['./add-people.component.css']
// })
// export class AddPeopleComponent {

// user = new FormControl([]);
//   userList: string[] = [];
//   selectedUsers: string[] = [];

//   constructor(
//     private firestore: AngularFirestore,
//     private userService: UserService
//     ) {}

//   ngOnInit() {
//     this.firestore.collection('users').valueChanges().subscribe((users: any) => {
//       this.userList = users.map(user => user.email);
//     });

//     this.user.valueChanges.subscribe((selectedUsers: string[]) => {
//       this.selectedUsers = selectedUsers;
//     });
//   }

//   chooseUsers() {
//     console.log('Wybrani użytkownicy:', this.selectedUsers);
//     this.userService.setSelectedUsers(this.selectedUsers);

//   }

  


// }


import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/shared/services/user';
import { UserService } from 'src/app/shared/services/user.service';
import { WalletService } from 'src/app/shared/services/wallet.service';

@Component({
  selector: 'add-people',
  templateUrl: './add-people.component.html',
  styleUrls: ['./add-people.component.css']
})
export class AddPeopleComponent {
  user = new FormControl([]);
  userList: User[] = []; // Używaj typu User zamiast string[]
  selectedUsers: User[] = []; // Używaj typu User zamiast string[]

  constructor(
    private firestore: AngularFirestore,
    private userService: UserService,
    private walletService: WalletService
  ) {}

  ngOnInit() {
    this.firestore.collection('users').valueChanges().subscribe((users: any) => {
      this.userList = users.map((user: any) => ({ userId: user.userId, email: user.email }));
    });

    this.user.valueChanges.subscribe((selectedUsers: User[]) => {
      this.selectedUsers = selectedUsers;
    });
  }
  


  chooseUsers() {
    console.log('Wybrani użytkownicy:', this.selectedUsers);
    this.userService.setSelectedUsers(this.selectedUsers);
    this.userService.saveUsersToFirestore(this.walletService.getSelectedWallet().walletId);
  }
}

