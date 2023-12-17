import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';
import { GeocodingService } from 'src/app/geocoding.service';
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
    private router: Router,
    private geocodingService: GeocodingService
  ) {}


  memoryForm: FormGroup = this.formBuilder.group({
    name: [''],
    description: [''],
    date: [''],
    location: ['']
  });

  // addMemory() {
  //   if (this.memoryForm.valid) {
  //     const { name, description, date, location } = this.memoryForm.value;
  
  //     if (name && description && date && location) {
  //       const memoryData = {
  //         name: name,
  //         description: description,
  //         date: date,
  //         location: location,
  //         userId: this.authService.getLoggedInUser().uid 
  //       };
  
  //       this.afs.collection('memories').add(memoryData).then(docRef => {
  //         console.log('Dodano nowy dokument z ID: ', docRef.id);
  //         this.redirectToMemorySee(docRef.id);
  //       }).catch(error => {
  //         console.error('Błąd podczas dodawania dokumentu: ', error);
  //       });

  //       this.memoryForm.reset();
  //     } else {
  //       console.warn('Wypełnij wszystkie pola przed dodaniem pamięci.');
  //     }
  //   }
  // }

  addMemory() {
    if (this.memoryForm.valid) {
      const { name, description, date, location } = this.memoryForm.value;
  
      if (name && description && date && location) {
        this.geocodingService.getCoordinatesByAddress(location).subscribe(
          (response: any) => {
            // Sprawdź, czy odpowiedź zawiera oczekiwane dane
            if (response.results && response.results.length > 0 && response.results[0].geometry) {
              const locationData = response.results[0].geometry.location;
  
              const memoryData = {
                name: name,
                description: description,
                date: date,
                location: location,
                userId: this.authService.getLoggedInUser().uid,
                latitude: locationData.lat,
                longitude: locationData.lng
              };
  
              this.afs.collection('memories').add(memoryData).then(docRef => {
                console.log('Dodano nowy dokument z ID: ', docRef.id);
                this.redirectToMemorySee(docRef.id);
              }).catch(error => {
                console.error('Błąd podczas dodawania dokumentu: ', error);
              });
  
              this.memoryForm.reset();
            } else {
              console.error('Nieprawidłowa odpowiedź z usługi geokodowania:', response);
            }
          },
          (error: any) => {
            console.error('Błąd podczas uzyskiwania współrzędnych:', error);
          }
        );
      } else {
        console.warn('Wypełnij wszystkie pola przed dodaniem pamięci.');
      }
    }
  }
  
  

  redirectToMemorySee(memoryId: string) {
     this.router.navigate(['/memory-see']);
  }
}
