import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'memories-add',
  templateUrl: './memories-add.component.html',
  styleUrls: ['./memories-add.component.css']
})
export class MemoriesAddComponent {
  constructor(
    private formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private authService: AuthService,
    private router: Router
  ) {}

  memoryForm: FormGroup = this.formBuilder.group({
    name: [''],
    description: [''],
    date: ['']
  });

  addMemory() {
    if (this.memoryForm.valid) {
      const { name, description, date } = this.memoryForm.value;
  
      if (name && description && date) {
        const memoryData = {
          name: name,
          description: description,
          date: date,
          userId: this.authService.getLoggedInUser().uid 
        };
  
        this.afs.collection('memories').add(memoryData).then(docRef => {
          console.log('Dodano nowy dokument z ID: ', docRef.id);
          this.redirectToMemorySee(docRef.id);
        }).catch(error => {
          console.error('Błąd podczas dodawania dokumentu: ', error);
        });

        this.memoryForm.reset();
      } else {
        console.warn('Wypełnij wszystkie pola przed dodaniem pamięci.');
      }
    }
  }
  

  redirectToMemorySee(memoryId: string) {
     this.router.navigate(['/memory-see']);
  }
}
