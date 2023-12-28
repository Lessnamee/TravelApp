import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent {
  @Input() name: string;
  @Input() description: string;
  @Output() removeMemoryEvent = new EventEmitter<void>();

  removeMemoryHandler(event: Event): void {
    event.stopPropagation();
    this.removeMemoryEvent.emit();
  }
}
