import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorySeeComponent } from './memory-see.component';

describe('MemorySeeComponent', () => {
  let component: MemorySeeComponent;
  let fixture: ComponentFixture<MemorySeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemorySeeComponent]
    });
    fixture = TestBed.createComponent(MemorySeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
