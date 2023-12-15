import { Component, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/services/user';

@Component({
  selector: 'add-wallet',
  templateUrl: './add-wallet.component.html',
  styleUrls: ['./add-wallet.component.css']
})
export class AddWalletComponent {

  // walletName: string = '';

  // constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  constructor(
    private formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.afs.collection('users').valueChanges().subscribe((users: any) => {
      this.userList = users.map((user: any) => ({ userId: user.userId, email: user.email }));
    });

    this.user.valueChanges.subscribe((selectedUsers: User[]) => {
      this.selectedUsers = selectedUsers;
    });
  }

  user = new FormControl([]);
  userList: User[] = []; 
  selectedUsers: User[] = []; 

  walletForm: FormGroup = this.formBuilder.group({
    name: [''],
    people: ['']
  });

  addWallet() {
    if (this.walletForm.valid) {
      const { name, people } = this.walletForm.value;
  
      if (name && people) {
        const walletData = {
          name: name,
          userId: this.authService.getLoggedInUser().uid, 
          walletId: this.afs.createId(),
          people: people
        };
  
        this.afs.collection('finances').add(walletData).then(docRef => {
          console.log('Dodano nowy portfel z ID: ', docRef.id);
          this.redirectToWalletSee();
        }).catch(error => {
          console.error('Błąd podczas dodawania dokumentu: ', error);
        });

        this.walletForm.reset();
      } else {
        console.warn('Wypełnij wszystkie pola przed dodaniem pamięci.');
      }
    }
  }
  

  redirectToWalletSee() {
     this.router.navigate(['/see-wallet']);
  }

}
