import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';

import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { LeftNavbarComponent } from './Components/left-navbar/left-navbar.component';
import { HeaderComponent } from './Components/header/header.component';
import { PlanningComponent } from './Components/planning/planning.component';
import { StartComponent } from './Components/start/start.component';
import { FinancesComponent } from './Components/finances/finances.component';
import { MemoriesComponent } from './Components/memories/memories.component';
import { RegisterComponent } from './Components/register/register.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { environment } from '../environments/environment';
import { NotFoundComponent } from './not-found/not-found.component';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LeftNavbarComponent,
    HeaderComponent,
    PlanningComponent,
    StartComponent,
    FinancesComponent,
    MemoriesComponent,
    RegisterComponent,
    SettingsComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    ButtonModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
