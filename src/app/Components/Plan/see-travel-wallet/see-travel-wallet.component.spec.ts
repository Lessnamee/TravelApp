import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeTravelWalletComponent } from './see-travel-wallet.component';

describe('SeeTravelWalletComponent', () => {
  let component: SeeTravelWalletComponent;
  let fixture: ComponentFixture<SeeTravelWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeeTravelWalletComponent]
    });
    fixture = TestBed.createComponent(SeeTravelWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
