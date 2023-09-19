import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'travel app';
  isUserLoggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.isUserLoggedIn$ = this.authService.isLoggedIn();
  }
}
