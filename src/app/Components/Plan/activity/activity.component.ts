import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent {

  toppings = this.formBuilder.group({
    autostop: false,
    fotografia: false,
    plaża: false,
    rowery: false,
    kemping: false,
    trekking: false,
    rolki: false,
    narty: false,
    góry: false,
    pływanie: false,
    koncert: false,
    zwiedzanie: false,
    wspinaczka: false

  });

  transport = this.formBuilder.group({
    auto: false,
    pociąg: false,
    autokar: false,
    samolot: false,
    motocykl: false
  });

  constructor(private formBuilder: FormBuilder) {}

}
