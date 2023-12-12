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

}


