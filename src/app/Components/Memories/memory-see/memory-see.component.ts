import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MemoryDetailComponent } from '../memory-detail/memory-detail.component';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'memory-see',
  templateUrl: './memory-see.component.html',
  styleUrls: ['./memory-see.component.css']
})
export class MemorySeeComponent implements OnInit {
  selectedDate: Date;
  memories: any[] = [];
  memoriesEmpty: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    public dialog: MatDialog,
    private authService: AuthService 
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const dateString = params['date'];
      if (dateString) {
        this.selectedDate = new Date(dateString);
        this.loadMemoriesForSelectedDate();
      }
    });
  }

  loadMemoriesForSelectedDate() {
    if (this.selectedDate) {
      const userId = this.authService.getLoggedInUser().uid;

      this.afs.collection('memories', ref =>
        ref.where('date', '==', this.selectedDate)
           .where('userId', '==', userId)
      ).valueChanges().subscribe(memories => {
        this.memories = memories;
        this.memoriesEmpty = this.memories.length === 0;
      });
    }
  }

  openDialog(memory: any) {
    const dialogRef = this.dialog.open(MemoryDetailComponent, { data: { memory } });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
