import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeWalletComponent } from './see-wallet.component';

describe('SeeWalletComponent', () => {
  let component: SeeWalletComponent;
  let fixture: ComponentFixture<SeeWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeeWalletComponent]
    });
    fixture = TestBed.createComponent(SeeWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
