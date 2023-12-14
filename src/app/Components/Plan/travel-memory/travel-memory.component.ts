import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MemoryDetailComponent } from '../../Memories/memory-detail/memory-detail.component';
import { AuthService } from 'src/app/shared/services/auth.service';
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
  newMemory: string = ''; 


  travelId = this.packingListService.getTravelId();

  constructor(
    private afs: AngularFirestore,
    public dialog: MatDialog,
    private authService: AuthService,
    private packingListService: PackingListService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
  }

  ngOnInit() {
    this.loadAllMemories()
  }

  
  saveToTravel(memory): void {
    console.log('Próba dodania wspomnienia:', memory);
  
    if (memory && typeof memory === 'object') {
      const travelID = this.packingListService.getTravelId();
  
      if (!this.data.travel.memory) {
        this.data.travel.memory = [];
      }
    
      const updatedMemory = [...this.data.travel.memory, memory];
    
      console.log('Aktualizowana tablica memory:', updatedMemory);
  
      this.afs.collection('travel', ref => ref.where('travelId', '==', travelID))
        .get()
        .subscribe(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({ memory: updatedMemory }).then(() => {
              console.log('Zaktualizowano dokument w Firebase po dodaniu wspomnienia.');
              this.data.travel.memory = updatedMemory;
            }).catch(error => {
              console.error('Błąd podczas aktualizowania dokumentu: ', error);
            });
          });
        });
    } else {
      console.error('Błąd: Nieprawidłowa wartość wspomnienia.', memory);
    }
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

