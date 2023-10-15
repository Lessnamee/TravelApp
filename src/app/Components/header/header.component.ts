import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/services/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnChanges {
  @Input() showNavbarItems: boolean = false;

  email: string;
  constructor(private authService: AuthService){}

  ngOnChanges(): void {
    if (!this.showNavbarItems) {
      return;
    }
    this.authService.userData$.subscribe(user => {
      this.email = user?.email;
    })
  }

}
