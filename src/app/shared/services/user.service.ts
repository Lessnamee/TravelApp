import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private selectedUsers: any;

  constructor(private firestore: AngularFirestore) {}


  setSelectedUsers(users: any) {
    this.selectedUsers = users;
  }

  getSelectedUsers() {
    return this.selectedUsers;
  }

  
}
