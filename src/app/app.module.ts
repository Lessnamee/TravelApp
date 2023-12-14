import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { AppComponent } from './app.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { HomeComponent } from './Components/Navi/home/home.component';
import { HeaderComponent } from './Components/Navi/header/header.component';
import { PlanningComponent } from './Components/Plan/planning/planning.component';
import { StartComponent } from './Components/Navi/start/start.component';
import { FinancesComponent } from './Components/Finance/finances/finances.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { environment } from '../environments/environment';
import { NotFoundComponent } from './Components/Other/not-found/not-found.component';
import { MessageService } from 'primeng/api';
import { ForgotPasswordComponent } from './Components/Other/forgot-password/forgot-password.component';
import { MemoriesAddComponent } from './Components/Memories/memories-add/memories-add.component';
import { MemorySeeComponent } from './Components/Memories/memory-see/memory-see.component';
import { DatePickerComponent } from './Components/Memories/date-picker/date-picker.component';
import { MemoryComponent } from './Components/Memories/memory/memory.component';
import { MemoryDetailComponent } from './Components/Memories/memory-detail/memory-detail.component';
import { WalletComponent } from './Components/Finance/wallet/wallet.component';
import { AddWalletComponent } from './Components/Finance/add-wallet/add-wallet.component';
import { AddPeopleComponent } from './Components/Finance/add-people/add-people.component';
import { WalletListComponent } from './Components/Finance/wallet-list/wallet-list.component';
import { PriceComponent } from './Components/Finance/price/price.component';
import { SeeWalletComponent } from './Components/Finance/see-wallet/see-wallet.component';
import { SeeWalletListComponent } from './Components/Finance/see-wallet-list/see-wallet-list.component';
import { NewTravelComponent } from './Components/Plan/new-travel/new-travel.component';
import { PlaceComponent } from './Components/Plan/place/place.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { ActivityComponent } from './Components/Plan/activity/activity.component';
import { TravelDetailsComponent } from './Components/Plan/travel-details/travel-details.component';
import { PeopleComponent } from './Components/Plan/people/people.component';
import { HotelComponent } from './Components/Plan/hotel/hotel.component';
import { VisitComponent } from './Components/Plan/visit/visit.component';
import { TravelWalletComponent } from './Components/Plan/travel-wallet/travel-wallet.component';
import { TravelMemoryComponent } from './Components/Plan/travel-memory/travel-memory.component';
import { SeeTravelComponent } from './Components/Plan/see-travel/see-travel.component';
import { DetailsComponent } from './Components/Plan/details/details.component';
import { EditTravelComponent } from './Components/Plan/edit-travel/edit-travel.component';
import { SeeTravelWalletComponent } from './see-travel-wallet/see-travel-wallet.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    PlanningComponent,
    StartComponent,
    FinancesComponent,
    RegisterComponent,
    NotFoundComponent,
    ForgotPasswordComponent,
    MemoriesAddComponent,
    MemorySeeComponent,
    DatePickerComponent,
    MemoryComponent,
    MemoryDetailComponent,
    WalletComponent,
    AddWalletComponent,
    AddPeopleComponent,
    WalletListComponent,
    PriceComponent,
    SeeWalletComponent,
    SeeWalletListComponent,
    NewTravelComponent,
    PlaceComponent,
    ActivityComponent,
    TravelDetailsComponent,
    PeopleComponent,
    HotelComponent,
    VisitComponent,
    TravelWalletComponent,
    TravelMemoryComponent,
    SeeTravelComponent,
    DetailsComponent,
    EditTravelComponent,
    SeeTravelWalletComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule,
    MatDividerModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    HttpClientModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule { }
