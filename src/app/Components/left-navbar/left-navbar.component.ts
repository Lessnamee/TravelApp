import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'left-navbar',
  templateUrl: './left-navbar.component.html',
  styleUrls: ['./left-navbar.component.css'],
})
export class LeftNavbarComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  closeSidenav() {
    this.sidenav.close();
  }
}
