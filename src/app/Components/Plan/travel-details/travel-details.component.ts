import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { PackingListService } from 'src/app/shared/services/packing-list.service';


@Component({
  selector: 'app-travel-details',
  templateUrl: './travel-details.component.html',
  styleUrls: ['./travel-details.component.css'],
})
export class TravelDetailsComponent implements OnInit {
  activityPackingList: { activity: string, items: string[] }[] = [];
  standardPackingList: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private packingListService: PackingListService,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
    this.updatePackingList();

    this.activityService.selectedActivities$.subscribe(() => {
      this.updatePackingList();
    });
  }

  updatePackingList() {
    this.activityPackingList = [];

    this.standardPackingList = this.packingListService.getPackingList('standard');
    
    const selectedActivities = this.activityService.selectedActivitiesValue;
    selectedActivities.forEach((activity) => {
      if (activity !== 'standard') {
        const packingListForActivity = this.packingListService.getPackingList(activity);
        this.activityPackingList.push({ activity, items: packingListForActivity });
      }
    });
  }
}
