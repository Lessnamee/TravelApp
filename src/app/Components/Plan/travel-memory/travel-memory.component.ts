import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MemoryDetailComponent } from '../../Memories/memory-detail/memory-detail.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PackingListService } from 'src/app/shared/services/packing-list.service';


@Component({
  selector: 'app-travel-memory',
  templateUrl: './travel-memory.component.html',
  styleUrls: ['./travel-memory.component.css']
})
export class TravelMemoryComponent {
  selectedDate: Date;
  memories: any[] = [];
  allMemories: any[] = [];
  memoriesEmpty: boolean = false;

  travelId = this.packingListService.getTravelId();

  constructor(
    private afs: AngularFirestore,
    public dialog: MatDialog,
    private authService: AuthService,
    private packingListService: PackingListService  ) {
  }

  ngOnInit() {
    this.loadAllMemories()
  }


  saveToTravel(memory): void {
    console.log(memory);
    console.log(this.travelId);
      this.afs.collection('travel', ref => ref.where('travelId', '==',  this.travelId))
        .get()
        .subscribe(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({ memory: memory }).then(() => {
              console.log('Zaktualizowano dokument w Firebase po dodaniu rzeczy.'); 
            }).catch(error => {
              console.error('Błąd podczas aktualizowania dokumentu: ', error);
            });
          });
        });
    
  }



  loadAllMemories() {
    const userId = this.authService.getLoggedInUser().uid;
    this.afs.collection('memories', ref =>
          ref.where('userId', '==', userId)
    ).valueChanges().subscribe(memories => {
      this.memories = memories;
      this.memoriesEmpty = this.memories.length === 0;
    });

  }

  openDialog(memory: any) {
    const dialogRef = this.dialog.open(MemoryDetailComponent, { data: { memory } });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

