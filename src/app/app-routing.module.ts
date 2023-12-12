import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/Navi/home/home.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { PlanningComponent } from './Components/Plan/planning/planning.component';
import { StartComponent } from './Components/Navi/start/start.component';
import { FinancesComponent } from './Components/Finance/finances/finances.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { NotFoundComponent } from './Components/Other/not-found/not-found.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { ForgotPasswordComponent } from './Components/Other/forgot-password/forgot-password.component';
import { userNotLogGuard } from './shared/guard/user-not-log.guard';
import { MemoriesAddComponent } from './Components/Memories/memories-add/memories-add.component';
import { MemorySeeComponent } from './Components/Memories/memory-see/memory-see.component';
import { DatePickerComponent } from './Components/Memories/date-picker/date-picker.component';
import { MemoryDetailComponent } from './Components/Memories/memory-detail/memory-detail.component';
import { WalletComponent } from './Components/Finance/wallet/wallet.component';
import { WalletListComponent } from './Components/Finance/wallet-list/wallet-list.component';
import { SeeWalletListComponent } from './Components/Finance/see-wallet-list/see-wallet-list.component';
import { SeeWalletComponent } from './Components/Finance/see-wallet/see-wallet.component';
import { NewTravelComponent } from './Components/Plan/new-travel/new-travel.component';
import { ActivityComponent } from './Components/Plan/activity/activity.component';
import { TravelDetailsComponent } from './Components/Plan/travel-details/travel-details.component';
import { SummaryComponent } from './Components/Plan/summary/summary.component';
import { PeopleComponent } from './Components/Plan/people/people.component';
import { HotelComponent } from './Components/Plan/hotel/hotel.component';
import { VisitComponent } from './Components/Plan/visit/visit.component';
import { TravelWalletComponent } from './Components/Plan/travel-wallet/travel-wallet.component';
import { SeeTravelComponent } from './Components/Plan/see-travel/see-travel.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'start' },
  { path: 'start', component: StartComponent, canActivate: [userNotLogGuard], data: {animation: 'Home'} },
  { path: 'login', component: LoginComponent, canActivate: [userNotLogGuard], data: {animation: 'Login'} },
  { path: 'register', component: RegisterComponent, canActivate: [userNotLogGuard], data: {animation: 'ForgotPasword'} },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: {animation: 'Home'}},
  { path: 'planning', component: PlanningComponent, canActivate: [AuthGuard], data: {animation: 'Subpage'} },
  { path: 'finances', component: FinancesComponent, canActivate: [AuthGuard], data: {animation: 'Subpage'} },
  { path: 'forgot-password', component: ForgotPasswordComponent, data: {animation: 'ForgotPasword'} },
  { path: 'memories-add', component: MemoriesAddComponent, data: {animation: 'Subpage-add-memory'} },
  { path: 'memory-see', component: MemorySeeComponent, data: {animation: 'Subpage'} },
  { path: 'date-picker', component: DatePickerComponent },
  { path: 'memory-detail', component: MemoryDetailComponent },
  { path: 'wallet', component: WalletComponent },
  { path: 'wallet-list', component: WalletListComponent },
  { path: 'see-wallet', component: SeeWalletComponent },
  { path: 'see-wallet-list', component: SeeWalletListComponent },
  { path: 'new-travel', component: NewTravelComponent },
  { path: 'place', component: PlanningComponent },
  { path: 'activity', component: ActivityComponent },
  { path: 'travel-details', component: TravelDetailsComponent},
  { path: 'people', component: PeopleComponent},
  { path: 'summary', component: SummaryComponent},
  { path: 'hotel', component: HotelComponent},
  { path: 'visit', component: VisitComponent},
  { path: 'travel-wallet', component: TravelWalletComponent},
  { path: 'see-travel', component: SeeTravelComponent},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
