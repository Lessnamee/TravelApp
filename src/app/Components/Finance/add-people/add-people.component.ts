import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'add-people',
  templateUrl: './add-people.component.html',
  styleUrls: ['./add-people.component.css']
})
export class AddPeopleComponent {

  constructor(public dialogRef: MatDialogRef<AddPeopleComponent>) { }

  email: string = '';
  emails: string[] = [''];


  addEmail() {
    if (this.email.trim() !== '') {
      this.emails.push(this.email);
      this.email = '';
    }
  }

  removeEmail(index: number) {
    this.emails.splice(index, 1);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
