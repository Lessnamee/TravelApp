import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit{
  @Input() showNavbarItems: boolean | null = true;

  constructor(public authService: AuthService){}
  ngOnInit(): void {
    if (!this.showNavbarItems) return;
  }

}
