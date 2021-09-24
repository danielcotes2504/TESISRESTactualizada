import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProvider } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { AdminComponent } from './components/admin.component';

import { RestProjectsComponent } from './components/restProjects.component';
import { RestDevicesComponent } from './components/restDevices.component';
import { RestDocumentsComponent } from './components/restDocuments.component';
import { RestVariablesComponent } from './components/restVariables.component';
import { RestTableComponent } from './components/restTable.component';
import { RestChartComponent } from './components/restChart.component';
import { RestDataComponent } from './components/restData.component';
import { RestSubNavbarComponent } from './components/restSubnavbar.component';
import { AuthService } from './services/auth.service';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar.component';
import { materialize } from 'rxjs/operators';
import { RegisterComponent } from './components/register.component';
import { ValidateService } from './services/validate.service';
import { PermissionService } from './services/permission.service';

import { TourProjectsComponent } from './components/tourProjects.component';
import { TourDevicesComponent } from './components/tourDevices.component';
import { TourVariablesComponent } from './components/tourVariables.component';
import { TourDataComponent } from './components/tourData.component';

import { FileUploadModule } from 'ng2-file-upload';

// primeng
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { GrowlModule } from 'primeng/growl';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChipsModule } from 'primeng/chips';
import { RadioButtonModule } from 'primeng/radiobutton';
import { StepsModule } from 'primeng/steps';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ColorPickerModule } from 'primeng/colorpicker';
import { AccordionModule } from 'primeng/accordion';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DragDropModule } from 'primeng/dragdrop';
import { PanelModule } from 'primeng/panel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SpinnerModule, Spinner } from 'primeng/spinner';
import { ChartModule } from 'primeng/chart';
import { BreadcrumbModule } from 'primeng/breadcrumb';

// import {CodeHighlighterModule} from 'primeng/codehighlighter';


import { AuthGuardService } from './services/authGuard.service';
import { UserListComponent } from './components/userList.component';
import { SocketService } from './services/socket.service';
import { UserLoginService } from './services/userLogin.service';
import { ProjectService } from './services/project.service';
import { DeviceService } from './services/device.service';
import { TokenService } from './services/token.service';
import { TutorialAdminComponent } from './components/tutorialAdmin.component';
import { LoaderService } from './loader/loader.service';
import { LoaderComponent } from './loader/loader.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
      NavbarComponent,
    RegisterComponent,
        UserListComponent,
     TutorialAdminComponent,
    LoaderComponent,
      RestProjectsComponent,
    RestDevicesComponent,
    RestDocumentsComponent,
    RestVariablesComponent,
    RestTableComponent,
    RestChartComponent,
    RestDataComponent,
    RestSubNavbarComponent,
    TourProjectsComponent,
    TourDevicesComponent,
    TourVariablesComponent,
    TourDataComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    HttpClientModule,
    HttpModule,
    FormsModule,
    MenubarModule,
    MenuModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    GrowlModule,
    MessageModule,
    MessagesModule,
    TableModule,
    TooltipModule,
    CheckboxModule,
    DialogModule,
    AutoCompleteModule,
    ChipsModule,
    RadioButtonModule,
    StepsModule,
    ToggleButtonModule,
    ColorPickerModule,
    AccordionModule,
    ToastModule,
    DropdownModule,
    ProgressSpinnerModule,
    FileUploadModule,
    ProgressBarModule,
    SelectButtonModule,
    DragDropModule,
    PanelModule,
    ScrollPanelModule,
    InputSwitchModule,
    SpinnerModule,
    ChartModule,
    BreadcrumbModule
    // CodeHighlighterModule
  ],
  providers: [appRoutingProvider, AuthService, ValidateService, AuthGuardService,
    SocketService, PermissionService, UserLoginService, ProjectService, DeviceService,DeviceService,
   TokenService,LoaderService],
  bootstrap: [AppComponent],


})
export class AppModule { }
