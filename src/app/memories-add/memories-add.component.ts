import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'memories-add',
  templateUrl: './memories-add.component.html',
  styleUrls: ['./memories-add.component.css']
})
export class MemoriesAddComponent {

  constructor(private formBuilder: FormBuilder, private db: AngularFireDatabase, private afs: AngularFirestore){}

  memoryForm: FormGroup = this.formBuilder.group({
    name: [''],
    description: [''],
    date: ['']
  });

  addMemory() {
    if (this.memoryForm.valid) {
      const { name, description, date } = this.memoryForm.value;
      if (name && date) {
        const memoryData = {
          name: name,
          description: description,
          date: date
        };
  
        // Tworzy referencję do kolekcji "memories" i dodaje nowy dokument
        this.afs.collection('memories').add(memoryData).then(docRef => {
          console.log('Dodano nowy dokument z ID: ', docRef.id);
        }).catch(error => {
          console.error('Błąd podczas dodawania dokumentu: ', error);
        });
  
        this.memoryForm.reset();
      }
    }
  }
  

}
