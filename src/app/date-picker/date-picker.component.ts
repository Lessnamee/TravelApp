import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {
  @Output() dateSelected = new EventEmitter<Date>();
  selectedDate: Date;

  constructor(private router: Router) { }

  onDateSelected() {
    if (this.selectedDate) {
      // Przekierowanie do widoku MemorySeeComponent i przekazanie daty jako parametru
      this.router.navigate(['/memory-see', { date: this.selectedDate.toISOString() }]);
    }
  }
}



