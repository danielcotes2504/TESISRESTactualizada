import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { AdminComponent } from './components/admin.component';
import { ErrorComponent } from './components/error.component';
import { HomeComponent } from './components/home.component';
import { ProfileComponent } from './components/profile.component';



import { AuthGuardService } from './services/authGuard.service';
import { TutorialAdminComponent } from './components/tutorialAdmin.component';
import { RestProjectsComponent } from './components/restProjects.component';
import { RestDevicesComponent } from './components/restDevices.component';
import { RestDocumentsComponent } from './components/restDocuments.component';
import { RestVariablesComponent } from './components/restVariables.component';
import { RestDataComponent } from './components/restData.component';
import { TourProjectsComponent } from './components/tourProjects.component';
import { TourDevicesComponent } from './components/tourDevices.component';
import { TourVariablesComponent } from './components/tourVariables.component';
import { TourDataComponent } from './components/tourData.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'restDevices', component: RestDevicesComponent, canActivate: [AuthGuardService] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService] },
    { path: 'restDocuments', component: RestDocumentsComponent, canActivate: [AuthGuardService] },
      { path: 'restProjects', component: RestProjectsComponent, canActivate: [AuthGuardService] },
    { path: 'restVariables', component: RestVariablesComponent, canActivate: [AuthGuardService] },
    { path: 'restData', component: RestDataComponent, canActivate: [AuthGuardService] },
    { path: 'tourProjects', component: TourProjectsComponent, canActivate: [AuthGuardService] },
    { path: 'tourDevices', component: TourDevicesComponent, canActivate: [AuthGuardService] },
    { path: 'tourVariables', component: TourVariablesComponent, canActivate: [AuthGuardService] },
    { path: 'tourData', component: TourDataComponent, canActivate: [AuthGuardService] },
    { path: 'error', component: ErrorComponent },
    { path: 'admintutorial', component: TutorialAdminComponent, canActivate: [AuthGuardService] },
       { path: '**', redirectTo: '/' }
];

export const appRoutingProvider: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
