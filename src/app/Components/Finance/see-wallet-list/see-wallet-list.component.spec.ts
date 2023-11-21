import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeWalletListComponent } from './see-wallet-list.component';

describe('SeeWalletListComponent', () => {
  let component: SeeWalletListComponent;
  let fixture: ComponentFixture<SeeWalletListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeeWalletListComponent]
    });
    fixture = TestBed.createComponent(SeeWalletListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
