import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeTravelComponent } from './see-travel.component';

describe('SeeTravelComponent', () => {
  let component: SeeTravelComponent;
  let fixture: ComponentFixture<SeeTravelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeeTravelComponent]
    });
    fixture = TestBed.createComponent(SeeTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
