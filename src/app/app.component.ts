import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HeaderComponent } from './Components/header/header.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'travel app';
  showNavbar$: Observable<boolean>
  constructor(private authService: AuthService){}
  
  ngOnInit(): void {
    this.showNavbar$ = this.authService.isUserLoggedIn$;
  }
}
