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
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'add-people',
  templateUrl: './add-people.component.html',
  styleUrls: ['./add-people.component.css']
})
export class AddPeopleComponent {

  user = new FormControl([]);
  userList: string[] = [];
  selectedUsers: string[] = [];

  constructor(
    private firestore: AngularFirestore,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.firestore.collection('users').valueChanges().subscribe((users: any) => {
      this.userList = users.map(user => user.email);
    });

    this.user.valueChanges.subscribe((selectedUsers: string[]) => {
      this.selectedUsers = selectedUsers;
    });
  }

  chooseUsers() {
    console.log('Wybrani użytkownicy:', this.selectedUsers);
    this.userService.setSelectedUsers(this.selectedUsers);
  }
}
