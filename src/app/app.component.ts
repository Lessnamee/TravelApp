import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HeaderComponent } from './Components/Navi/header/header.component';
import { Observable } from 'rxjs';
import { slideInAnimation } from './animations/route-animation';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ slideInAnimation ]
})
export class AppComponent implements OnInit {
  title = 'travel app';
  showNavbar$: Observable<boolean>
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.showNavbar$ = this.authService.isUserLoggedIn$;
  }
}
