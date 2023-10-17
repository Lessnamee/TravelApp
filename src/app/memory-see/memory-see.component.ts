import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'memory-see',
  templateUrl: './memory-see.component.html',
  styleUrls: ['./memory-see.component.css']
})
export class MemorySeeComponent implements OnInit {
  selectedDate: Date;
  memories: any[] = [];
  memoriesEmpty: boolean = false;

  constructor(private route: ActivatedRoute, private afs: AngularFirestore) {}

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
      // Pobierz wspomnienia na podstawie wybranej daty
      this.afs.collection('memories', ref => ref.where('date', '==', this.selectedDate)).valueChanges().subscribe(memories => {
        this.memories = memories;
        this.memoriesEmpty = this.memories.length === 0;
      });
    }
  }
}
