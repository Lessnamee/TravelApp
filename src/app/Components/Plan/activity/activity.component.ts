import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/shared/services/activity.service';

@Component({
  selector: 'activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent {

  toppings = this.formBuilder.group({
    autostop: false,
    fotografia: false,
    plażowanie: false,
    rowery: false,
    kemping: false,
    trekking: false,
    wspinaczka: false,
    dziecko: false,
    samochód: false,
    pociąg: false,
    autokar: false,
    samolot: false,
    motocykl: false

  });


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activityService: ActivityService
  ) {}

  onSubmit() {
    const selectedActivities = Object.keys(this.toppings.controls)
      .filter((control) => this.toppings.controls[control].value);

    const updatedSelectedActivities = [...selectedActivities];
    this.activityService.updateSelectedActivities(updatedSelectedActivities);

    this.router.navigate(['/travel-details']);
  }

}



