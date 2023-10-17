import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoriesAddComponent } from './memories-add.component';

describe('MemoriesAddComponent', () => {
  let component: MemoriesAddComponent;
  let fixture: ComponentFixture<MemoriesAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemoriesAddComponent]
    });
    fixture = TestBed.createComponent(MemoriesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
