import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/header/header.component';
import { LoginComponent } from './Components/login/login.component';
import { LeftNavbarComponent } from './Components/left-navbar/left-navbar.component';
import { PlanningComponent } from './Components/planning/planning.component';
import { StartComponent } from './Components/start/start.component';
import { FinancesComponent } from './Components/finances/finances.component';
import { MemoriesComponent } from './Components/memories/memories.component';
import { RegisterComponent } from './Components/register/register.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { AuthGuard } from './services/auth-guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'start' },
  { path: 'start', component: StartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'planning', component: PlanningComponent, canActivate: [AuthGuard] },
  { path: 'finances', component: FinancesComponent, canActivate: [AuthGuard] },
  { path: 'memories', component: MemoriesComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}