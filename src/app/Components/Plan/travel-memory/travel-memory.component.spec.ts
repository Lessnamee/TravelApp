import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelMemoryComponent } from './travel-memory.component';

describe('TravelMemoryComponent', () => {
  let component: TravelMemoryComponent;
  let fixture: ComponentFixture<TravelMemoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelMemoryComponent]
    });
    fixture = TestBed.createComponent(TravelMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
