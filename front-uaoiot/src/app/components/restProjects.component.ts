import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { ProjectModel, DeviceModel, ApiService } from "../services/api.service";
import { Message } from "primeng/components/common/api";
import { environment } from "../../environments/environment";
import { ShepherdService } from 'angular-shepherd';
import { AuthService } from '../services/auth.service';
import { UserLoginService } from '../services/userLogin.service';
@Component({
  selector: "app-rest-projects",
  templateUrl: "../views/restProjects.component.html",
  styleUrls: ["../styles/restProjects.component.scss"],
})
export class RestProjectsComponent implements OnInit {

  displayNewProject = false;
  displayEditProject = false;
  projects: ProjectModel[] = [];
  devices: DeviceModel[][] = [[]];
  updatedProject: ProjectModel = { user: "", project: "" };
  newProject: ProjectModel = { user: "", project: "" };
  user: string;
  url: string;
  msgs: Message[] = [];
  msg: Message[] = [];
  navigationType = "";
  pjPass: ProjectModel;
  public displayDeleteProject = false;
  public textLabel: string = "Tutorial";
  counter:number=0;
  public userNameFromLogin;
  public stringUserName;
  @Output() changeModeEvent = new EventEmitter<string>();

  constructor(private router: Router, private apiService: ApiService, private shepherdService: ShepherdService, public authService: AuthService,
    public userLoginService: UserLoginService,
   ) {}

  ngOnInit() {
    this.authService.getLoggedInName.subscribe(name => this.stringUserName = name);
    this.authService.getLoggedInUser.subscribe(user => this.userNameFromLogin = user);
    console.log(this.authService.getLoggedInUser.subscribe(user => this.userNameFromLogin = user))
    this.getUserName();
    console.log(this.userNameFromLogin)
  if(this.userNameFromLogin === "admin"){
    this.router.navigate(['/admin']);
  }

    this.user = this.apiService.getCurrentUser();
    this.getData();
    if (this.router.url === '/restProjects') {
      this.shepherdService.cancel();
  }
 
  
  }
  // Only AlphaNumeric with Some Characters [-_ ]
  keyPressAlphaNumericWithCharacters(event) {
   
    var inp = String.fromCharCode(event.keyCode);
    // Allow numbers, alpahbets, space, underscore
    if (/[a-zA-Z0-9-_ ]/.test(inp)) {
       
      return true;
      
    } else {
        (async () => { 
          
            // Do something before delay
            if(this.counter<=0){
                this.showCharacterError();
            }
            this.counter++;       
    
            await this.delay(2000);
    
            // Do something after
             this.hide();
        })();
      event.preventDefault();
      
    
      return false;
    }
    
  }
  getData() {
    this.apiService
      .getProjects(environment.restUrl + "apiProjects/" + this.user)
      .subscribe((resProject) => {
        this.projects = resProject.body;
      });
  }

  previusProjectsClick(event, project: ProjectModel) {
    this.apiService.setCurrentProject(project.project);
    this.router.navigate(["/restVariables"]);
  }

  openDeleteDialog(event, selectedProject: ProjectModel) {
    this.displayDeleteProject = true;
    this.pjPass = selectedProject;
  }
  trashClick() {
    this.displayDeleteProject = false;
    this.url =
      environment.restUrl +
      "apiProjects/" +
      this.pjPass.user +
      "/" +
      this.pjPass.project;
    this.apiService.delete(this.url).subscribe((resDeleteProject) => {
      if (resDeleteProject.message === "Deleted") {
        this.getData();
      }
    });
  }

  editClick(event, project: ProjectModel) {
    this.pjPass = project;
    this.displayEditProject = true;
    
    this.url =
      environment.restUrl +
      "apiProjects/" +
      project.user +
      "/" +
      project.project;

    this.updatedProject = project;
   
   
  }

  getEditProject() {
    if (this.displayEditProject === true) {
      return this.pjPass.project;
    }
  }
  updateProjectClick(event, newDeviceName: string) {
   

    if (newDeviceName !== "") {
      if(newDeviceName.length<=30){
        this.updatedProject.project = newDeviceName;
        this.clear();
        this.apiService
          .updateProject(this.updatedProject, this.url)
          .subscribe((resUpdateProject) => {
            if (resUpdateProject.message === "Updated") {
              this.getData();
              this.displayEditProject = false;
            }
          });
      }
      else{
        (async () => { 
          
          // Do something before delay
          if(this.counter<=0){
              this.showLongName();
          }
          this.counter++;       
  
          await this.delay(2000);
  
          // Do something after
           this.hide();
      })();
      }
 
    } else {
        (async () => { 
          
            // Do something before delay
            if(this.counter<=0){
                this.show();
            }
            this.counter++;       
    
            await this.delay(2000);
    
            // Do something after
             this.hide();
        })();
    }
  }

  newProjectClick() {
    this.displayNewProject = true;
    this.url = environment.restUrl + "apiProjects/" + this.user;
  }

  addProjectClick(event, projectName: string) {
    this.newProject.project = projectName;
    this.newProject.user = this.user;
    if (this.newProject.project !== "") {
        if(this.newProject.project.length<=30){
       
            this.clear();
            this.apiService
              .addProject(this.newProject, this.url)
              .subscribe((resAddProject) => {
                if (resAddProject.message === "Saved") {
                  this.getData();
                  this.displayNewProject = false;
                }
              });
        }
        else{
            (async () => { 
          
                // Do something before delay
                if(this.counter<=0){
                    this.showLongName();
                }
                this.counter++;       
        
                await this.delay(2000);
        
                // Do something after
                 this.hide();
            })();
        }

    
    } else {
        (async () => { 
          
            // Do something before delay
            if(this.counter<=0){
                this.show();
            }
            this.counter++;       
    
            await this.delay(2000);
    
            // Do something after
             this.hide();
        })();
    }
  }

  changeMode() {
    this.apiService.setNavigationType("takeTour");
    this.changeModeEvent.emit("takeTour");
    this.router.navigate(["/tourProjects"]);
  }

  show() {
    this.msgs.push({
      severity: "error",
      summary: "No se ingresó el nombre",
    });
  }
  hide(){
      this.msgs=[]
      this.counter=0;
  }

  showCharacterError() {
    this.msgs.push({
      severity: "error",
      summary: "No se permiten caracteres especiales",
    });

  
  }
  showLongName() {
    this.msgs.push({
        severity: 'error',
        summary: 'El nombre es demasiado largo'
    });
}
  clear() {
    this.displayEditProject = false;
    this.displayNewProject = false;
    this.msgs = [];
  }

  textOnHover() {
    this.textLabel = "Tutorial de proyectos";
  }
  textOnLeave() {
    this.textLabel = "Tutorial";
  }

 delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

getUserName() {
  this.stringUserName = '';
  if (sessionStorage.getItem('user') == null) {
      this.stringUserName = 'perfil';
  } else {
      const userProfile = JSON.parse(sessionStorage.getItem('user'));
      this.userNameFromLogin = userProfile.user;
      this.stringUserName = userProfile.name;

      
  }
}
}
