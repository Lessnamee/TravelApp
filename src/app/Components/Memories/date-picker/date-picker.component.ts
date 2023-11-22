import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {
  constructor(private router: Router) { }

  onDateSelected(selectedDate: Date) {
      // Przekierowanie do widoku MemorySeeComponent i przekazanie daty jako parametru
      this.router.navigate(['/memory-see', { date: selectedDate.toISOString() }]);
  }
}



