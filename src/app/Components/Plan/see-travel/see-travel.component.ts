import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DetailsComponent } from '../details/details.component';
import { PackingListService } from 'src/app/shared/services/packing-list.service';

@Component({
  selector: 'see-travel',
  templateUrl: './see-travel.component.html',
  styleUrls: ['./see-travel.component.css']
})
export class SeeTravelComponent {


  travels: any[] = [];
  allTravels: any[] = [];
  travelsEmpty: boolean = false;
  selectedThings: string[] = [];

  constructor(
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    private authService: AuthService,
    private packingListService: PackingListService
  ) {}

  ngOnInit() {
    this.loadAllTravels()
  }

  loadAllTravels() {
    console.log("hej");
    const userId = this.authService.getLoggedInUser().uid;
    this.firestore.collection('travel', ref =>
          ref.where('userId', '==', userId)
    ).valueChanges().subscribe(travel => {
      console.log(travel);
      this.travels = travel;
      this.travelsEmpty = this.travels.length === 0;
    });

  }

  openDialog(travel: any) {
    const dialogRef = this.dialog.open(DetailsComponent, { data: { travel } });
    this.packingListService.setTravelId(travel.travelId)
    console.log(travel.travelId);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  
}
