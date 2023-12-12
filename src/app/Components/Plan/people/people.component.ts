import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/shared/services/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent {

  user = new FormControl([]);
  userList: User[] = []; 
  selectedUsers: User[] = []; 

  constructor(
    private firestore: AngularFirestore,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.firestore.collection('users').valueChanges().subscribe((users: any) => {
      this.userList = users.map((user: any) => ({ userId: user.userId, email: user.email }));
    });

    this.user.valueChanges.subscribe((selectedUsers: User[]) => {
      this.selectedUsers = selectedUsers;
    });
  }
  
  addUsers() {
    console.log('Wybrani użytkownicy:', this.selectedUsers);
    this.userService.setSelectedUsers(this.selectedUsers);
    // this.userService.saveUsersToFirestore(this.walletService.getSelectedWallet().walletId);
  }
}
