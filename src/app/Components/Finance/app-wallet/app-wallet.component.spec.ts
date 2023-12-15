import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppWalletComponent } from './app-wallet.component';

describe('AppWalletComponent', () => {
  let component: AppWalletComponent;
  let fixture: ComponentFixture<AppWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppWalletComponent]
    });
    fixture = TestBed.createComponent(AppWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
