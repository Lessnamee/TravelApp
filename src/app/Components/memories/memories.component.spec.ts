import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoriesComponent } from './memories.component';

describe('MemoriesComponent', () => {
  let component: MemoriesComponent;
  let fixture: ComponentFixture<MemoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemoriesComponent],
    });
    fixture = TestBed.createComponent(MemoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
