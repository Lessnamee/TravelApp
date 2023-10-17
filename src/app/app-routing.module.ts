import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { PlanningComponent } from './Components/planning/planning.component';
import { StartComponent } from './Components/start/start.component';
import { FinancesComponent } from './Components/finances/finances.component';
import { MemoriesComponent } from './Components/memories/memories.component';
import { RegisterComponent } from './Components/register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { userNotLogGuard } from './shared/guard/user-not-log.guard';
import { MemoriesAddComponent } from './memories-add/memories-add.component';
import { MemorySeeComponent } from './memory-see/memory-see.component';
import { DatePickerComponent } from './date-picker/date-picker.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'start' },
  { path: 'start', component: StartComponent, canActivate: [userNotLogGuard]},
  { path: 'login', component: LoginComponent, canActivate: [userNotLogGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [userNotLogGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'planning', component: PlanningComponent, canActivate: [AuthGuard]},
  { path: 'finances', component: FinancesComponent, canActivate: [AuthGuard]},
  { path: 'memories', component: MemoriesComponent, canActivate: [AuthGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'memories-add', component: MemoriesAddComponent},
  { path: 'memory-see', component: MemorySeeComponent},
  { path: 'date-picker', component: DatePickerComponent},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
