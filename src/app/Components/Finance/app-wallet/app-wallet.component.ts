import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './app-wallet.component.html',
  styleUrls: ['./app-wallet.component.css']
})
export class AppWalletComponent {

  @Input() name: string;
  @Input() description: string;


}
