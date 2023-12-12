import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelWalletComponent } from './travel-wallet.component';

describe('TravelWalletComponent', () => {
  let component: TravelWalletComponent;
  let fixture: ComponentFixture<TravelWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelWalletComponent]
    });
    fixture = TestBed.createComponent(TravelWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
