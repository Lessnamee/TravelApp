import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PackingListService {

  private selectedCity: string;
  private travelName: string;

  constructor(private firestore: AngularFirestore) {}

  getPackingList(activity: string): Observable<string[]> {
    return this.firestore
      .collection("packingLists")
      .doc('cL3eUpsf8E6dzpMzt3ke') 
      .valueChanges()
      .pipe(
        map((doc: any) => {
          const activityList = doc[activity] || [];
          return activityList as string[]; 
        })
      );
  }

  
  // getPackingList(activity: string): string[] {
  //   return this.packingLists[activity] || [];
  // }

  getCity(): string {
    return this.selectedCity;
  }

  setCity(city: string): void {
    this.selectedCity = city;
  }

  getName(): string {
    return this.travelName;
  }

  setName(name: string): void {
    this.travelName = name;
  }


}






