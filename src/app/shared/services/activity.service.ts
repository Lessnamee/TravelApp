import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private selectedActivitiesSubject = new BehaviorSubject<string[]>([]);
  selectedActivities$ = this.selectedActivitiesSubject.asObservable();

  get selectedActivitiesValue(): string[] {
    return this.selectedActivitiesSubject.value;
  }

  updateSelectedActivities(activities: string[]) {
    this.selectedActivitiesSubject.next(activities);
  }

  private selectedThingsSubject = new BehaviorSubject<string[]>([]);
  selectedThings$ = this.selectedThingsSubject.asObservable();

  updateSelectedThings(selectedThings: string[]): void {
    this.selectedThingsSubject.next(selectedThings);
  }

}


