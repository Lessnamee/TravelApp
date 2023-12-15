import { Component, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PackingListService } from 'src/app/shared/services/packing-list.service';
import { User } from 'src/app/shared/services/user';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { WalletService } from 'src/app/shared/services/wallet.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TravelMemoryComponent} from '../travel-memory/travel-memory.component';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  walletID;

  selectedThings: string[] = [];
  visibleThings: string[] = [];
  newThing: string = ''; 

  newVisit: string = ''; 
  newVisitLink: string = '';
  visibleVisits: { place: string, link: string }[] = [];
  selectedVisits: { place: string, link: string }[] = [];

  newHotel: string = ''; 
  newHotelLink: string = '';
  visibleHotel: { place: string, link: string }[] = [];
  selectedHotel: { place: string, link: string }[] = [];

  weatherData: any;
  city = this.packingListService.getCity();

  user = new FormControl([]);
  userList: User[] = []; 
  selectedUsers: User[] = []; 
  tripMembers: string[] = []; 

  wallet = new FormControl<string>('');
  walletList: any[] = []; 
  selectedWallet; 

  travelID;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firestore: AngularFirestore,
    private packingListService: PackingListService,
    private weatherService: WeatherService,
    private walletService: WalletService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {   }




  openDialog(): void {
    const dialogRef = this.dialog.open(TravelMemoryComponent, {
      width: '250px',
      data: this.data  
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }
  


  ngOnInit(): void {
    this.travelID = this.packingListService.getTravelId();

    this.getWeather();

    this.loadTravelMembers();

    this.firestore.collection('users').valueChanges().subscribe((users: any) => {
      this.userList = users.map((user: any) => ({ userId: user.userId, email: user.email }));
    });

    this.user.valueChanges.subscribe((selectedUsers: User[]) => {
      this.selectedUsers = selectedUsers;
    });


    if (!this.data.travel.selectedVisits) {
      this.data.travel.selectedVisits = []; 
    }
    this.visibleVisits = [...this.data.travel.selectedVisits];

    if (!this.data.travel.selectedThings) {
      this.data.travel.selectedThings = []; 
    }
    this.visibleThings = [...this.data.travel.selectedThings];
  
    if (!this.data.travel.selectedHotel) {
      this.data.travel.selectedHotel = []; 
    }
    this.visibleHotel = [...this.data.travel.selectedHotel];


    this.authService.userData$.subscribe(user => {
      if (user) {
        const loggedInUserId = user.uid;

        this.firestore.collection('finances').snapshotChanges().subscribe((finances: any) => {
          this.walletList = finances.map(fin => {
            const data = fin.payload.doc.data();
            const id = fin.payload.doc.id;
            
            const people = data.people ?? [];
            const userId = data.userId ?? '';

            return { id, ...data, people, userId };
          }).filter(wallet => 
            wallet.people.some(person => person.userId === loggedInUserId) || wallet.userId === loggedInUserId
          );
        });
      }
    });

    this.wallet.valueChanges.subscribe((selectedWallet: string) => {
      this.selectedWallet = this.walletList.find(wallet => wallet.name === selectedWallet);

    });
    

  }

  loadTravelMembers() {
    this.firestore.collection('travel', ref => ref.where('travelId', '==', this.travelID))
      .valueChanges()
      .subscribe((travelData: any) => {
        if (travelData.length > 0) {
          this.tripMembers = travelData[0].people || [];
        }
      });
  }



  chooseUsers() {

    const travelID = this.packingListService.getTravelId();

      const peopleData = {
        people: this.selectedUsers
      };
  
      this.firestore.collection('travel', ref => ref.where('travelId', '==', travelID))
        .get()
        .subscribe(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({ people: peopleData.people }).then(() => {
              console.log('Zaktualizowano dane w Firestore');
              this.loadTravelMembers();
            }).catch(error => {
              console.error('Błąd podczas aktualizacji danych w Firestore:', error);
            });
          });
        });
  }
  
  
  removeMember(email: string) {
    this.tripMembers = this.tripMembers.filter(member => member !== email);
  }

  removeThing(thing: string) {
    const travelID = this.packingListService.getTravelId();

    const updatedThings = this.data.travel.selectedThings.filter(item => item !== thing);

    this.firestore.collection('travel', ref => ref.where('travelId', '==', travelID))
      .get()
      .subscribe(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({ selectedThings: updatedThings }).then(() => {
            console.log('Zaktualizowano dokument w Firebase po usunięciu rzeczy.');
            this.data.travel.selectedThings = updatedThings;
            this.visibleThings = updatedThings;
          }).catch(error => {
            console.error('Błąd podczas aktualizowania dokumentu: ', error);
          });
        });
      });
  } 

  addThing() {
    if (this.newThing.trim() !== '') {
      const travelID = this.packingListService.getTravelId();

      const updatedThings = [...this.data.travel.selectedThings, this.newThing.trim()];

      this.firestore.collection('travel', ref => ref.where('travelId', '==', travelID))
        .get()
        .subscribe(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({ selectedThings: updatedThings }).then(() => {
              console.log('Zaktualizowano dokument w Firebase po dodaniu rzeczy.');
              this.data.travel.selectedThings = updatedThings;
              this.visibleThings = updatedThings;
              this.newThing = ''; 
            }).catch(error => {
              console.error('Błąd podczas aktualizowania dokumentu: ', error);
            });
          });
        });
    }
  }

  removeVisit(visit: { place: string, link: string }) {
    const travelID = this.packingListService.getTravelId();

    const updatedVisits = this.data.travel.selectedVisits.filter(item => item !== visit);

    this.firestore.collection('travel', ref => ref.where('travelId', '==', travelID))
      .get()
      .subscribe(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({ selectedVisits: updatedVisits }).then(() => {
            console.log('Zaktualizowano dokument w Firebase po usunięciu wizyty.');
            this.data.travel.selectedVisits = updatedVisits;
            this.visibleVisits = updatedVisits;
          }).catch(error => {
            console.error('Błąd podczas aktualizowania dokumentu: ', error);
          });
        });
      });
  }

  addVisit() {
    if (this.newVisit.trim() !== '') {
      const travelID = this.packingListService.getTravelId();

      const updatedVisits = [
        ...this.data.travel.selectedVisits,
        { place: this.newVisit.trim(), link: this.newVisitLink.trim() || '' }
      ];

      this.firestore.collection('travel', ref => ref.where('travelId', '==', travelID))
        .get()
        .subscribe(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({ selectedVisits: updatedVisits }).then(() => {
              console.log('Zaktualizowano dokument w Firebase po dodaniu wizyty.');
              this.data.travel.selectedVisits = updatedVisits;
              this.visibleVisits = updatedVisits;
              this.newVisit = ''; 
              this.newVisitLink = '';
            }).catch(error => {
              console.error('Błąd podczas aktualizowania dokumentu: ', error);
            });
          });
        });
    }
  }


  removeHotel(hotel: { place: string, link: string }) {
    const travelID = this.packingListService.getTravelId();

    const updatedHotel = this.data.travel.selectedHotel.filter(item => item !== hotel);

    this.firestore.collection('travel', ref => ref.where('travelId', '==', travelID))
      .get()
      .subscribe(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({ selectedHotel: updatedHotel }).then(() => {
            console.log('Zaktualizowano dokument w Firebase po usunięciu wizyty.');
            this.data.travel.selectedHotel = updatedHotel;
            this.visibleHotel = updatedHotel;
          }).catch(error => {
            console.error('Błąd podczas aktualizowania dokumentu: ', error);
          });
        });
      });
  }

  addHotel() {
    if (this.newHotel.trim() !== '') {
      const travelID = this.packingListService.getTravelId();

      const updatedHotel = [
        ...this.data.travel.selectedHotel,
        { place: this.newHotel.trim(), link: this.newHotelLink.trim() || '' }
      ];

      this.firestore.collection('travel', ref => ref.where('travelId', '==', travelID))
        .get()
        .subscribe(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({ selectedHotel: updatedHotel }).then(() => {
              console.log('Zaktualizowano dokument w Firebase po dodaniu wizyty.');
              this.data.travel.selectedHotel = updatedHotel;
              this.visibleHotel = updatedHotel;
              this.newHotel = ''; 
              this.newHotelLink = '';
            }).catch(error => {
              console.error('Błąd podczas aktualizowania dokumentu: ', error);
            });
          });
        });
    }
  }


  addWallet() {
    this.walletService.setSelectedWallet(this.selectedWallet);    

    this.walletID = this.walletService.getSelectedWallet().walletId;
    const travelID = this.packingListService.getTravelId();
  
    this.firestore.collection('travel').ref.where('travelId', '==', travelID)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.exists) {
            this.firestore.collection('travel').doc(doc.id).update({ walletId: this.walletID }).then(() => {
              console.log('Zaktualizowano dokument w Firebase po dodaniu wizyty.');
            }).catch(error => {
              console.error('Błąd podczas aktualizowania dokumentu: ', error);
            });
          } else {
            console.log('Dokument o podanym ID nie istnieje.');
          }
        });
      })
      .catch(error => {
        console.error('Błąd podczas pobierania dokumentu: ', error);
      });
  }

  getWeather() {
    this.weatherService.getWeather(this.city).subscribe((data) => {
      this.weatherData = data;
      this.weatherData.main.temp = this.kelvinToCelsius(this.weatherData.main.temp).toFixed(2);
    });
  }

  private kelvinToCelsius(kelvin: number): number {
    return kelvin - 273.15;
  }
  
  }
