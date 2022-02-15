import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, VariableModel, DeviceModel } from '../services/api.service';
import { SelectItem } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { environment } from '../../environments/environment';
import { ShepherdService } from 'angular-shepherd';
import { AuthService } from '../services/auth.service';
import { UserLoginService } from '../services/userLogin.service';

@Component({
    selector: 'app-rest-variables',
    templateUrl: '../views/restVariables.component.html',
    styleUrls: ['../styles/restVariables.component.scss']
})

export class RestVariablesComponent implements OnInit {

    msgsDev: Message[] = [];
    i: number;
    msgs: Message[];
    public displayDeleteVariable = false;
    val: number;
    comparatives: SelectItem[] = [];
    state = 'Independiente';
    displayNewVariable = false;
    displayEditVariable = false;
    displayDependentOptions = false;
    variables: VariableModel[] = [];
     independentVariables: VariableModel[] = [];
    auxVariable: VariableModel = {
        
        
        user: '', project: '', deviceN: '', deviceH: '', variableN: '',
        variableT: 'Independiente', variableInd: '-', constant: 0, operation: '-', positive: 1, negative: 31416
    };
    newVariable: VariableModel = {
        user: '', project: '', deviceN: '', deviceH: '', variableN: '',
        variableT: 'Independiente', variableInd: '-', constant: 0, operation: '-', positive: 1, negative: 31416
    };
    updatedVariable: VariableModel = {
        user: '', project: '', deviceN: '', deviceH: '', variableN: '',
        variableT: '', variableInd: '', constant: 0, operation: '', positive: 1, negative: 31416
    };
    devices: DeviceModel[];
    project = '';
    user = '';
    url = '';
    tipoVariable:boolean;
    varPass: VariableModel;
    public textLabel:string='Tutorial';
    selectedValue: string='Independiente';
    counter:number=0;
    public userNameFromLogin;
    public stringUserName;

    constructor(private router: Router, private apiService: ApiService, private shepherdService: ShepherdService,public authService: AuthService,
        public userLoginService: UserLoginService) {
        this.user = this.apiService.getCurrentUser();
        this.project = this.apiService.getCurrentProject();
        this.comparatives = [
            { title: 'equal', value: 'equal', icon: 'pi pi-align-justify' },
            { title: 'greater', value: 'greater', icon: 'pi pi-angle-right' },
            { title: 'lesser', value: 'lesser', icon: 'pi pi-angle-left' },
            { title: 'different', value: 'different', icon: 'pi pi-minus' },
        ];
    }

    ngOnInit() {
        this.authService.getLoggedInName.subscribe(name => this.stringUserName = name);
        this.authService.getLoggedInUser.subscribe(user => this.userNameFromLogin = user);
        console.log(this.authService.getLoggedInUser.subscribe(user => this.userNameFromLogin = user))
        this.getUserName();
        console.log(this.userNameFromLogin)
      if(this.userNameFromLogin === "admin"){
        this.router.navigate(['/admin']);
      }
        
        this.clear();
        this.getData();
        if (this.router.url === '/restVariables') {
            this.shepherdService.cancel();
        }
    }

    getData() {
        this.apiService.getVariables(environment.restUrl + 'apiVariables/' + this.user +
            '/' + this.project).subscribe(resVariables => {
                this.variables = resVariables.body;
                this.variables.forEach(element => {
                    
                    if (element.variableT === 'Independiente') {
                        this.independentVariables.push(element);
                    }
                    
                });
               
            });

        this.apiService.getDevices(environment.restUrl + 'apiDevices/' + this.user + '/' + this.project)
            .subscribe(resDevices => {
                this.devices = resDevices.body;
                if (this.devices.length === 0) {
                    this.showDev();
                }
                this.auxVariable.deviceN = this.devices[0].deviceN;
                this.auxVariable.deviceH = this.devices[0].deviceH;
            });
    }

    previusVariablesClick(event, selectedVariable: VariableModel) {
        this.apiService.setCurrentVariable(selectedVariable);
        this.router.navigate(['/restData']);
    }

    openDeleteDialog(event,selectedVariable: VariableModel) {
    this.displayDeleteVariable=true;
    this.varPass = selectedVariable;
   
 
    }
    trashClick() {
   

        this.displayDeleteVariable = false;
        this.url = environment.restUrl + 'apiVariables/' +
            this.varPass.user + '/' + this.varPass.project + '/' + this.varPass.deviceN + '/'
            + this.varPass.deviceH + '/' + this.varPass.variableN + '/' + this.varPass.variableT;
           
        this.apiService.delete(this.url).subscribe(resDeleteVariable => {
            if (resDeleteVariable.message === 'Deleted') {
                // this.variables = this.variables.filter(p => p !== selectedVariable);
                this.getData();
            }
        });
    }

    editClick(event, selectedVariable: VariableModel) {
        this.varPass= selectedVariable;
        this.displayEditVariable = true;
        this.updatedVariable = selectedVariable;
        this.url = environment.restUrl + 'apiVariables/' + selectedVariable.user + '/' + selectedVariable.project +
            '/' + selectedVariable.deviceN + '/' + selectedVariable.variableN;
    }

    getEditVariable(){
        if(this.displayEditVariable === true){
            return this.varPass.variableN;
        }
    
    }

    updateVariableClick(event, variableName: string) {
        
        if (variableName !== '') {
            if(variableName.length<=30){
                this.updatedVariable.variableN = variableName;
                this.clear();
                this.apiService.updateVariable(this.updatedVariable, this.url).subscribe(resUpdateVariable => {
                    if (resUpdateVariable.message === 'Updated') {
                        this.getData();
                        this.displayEditVariable = false;
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

    newVariableClick() {
        this.displayNewVariable = true;
        this.auxVariable.user = this.user;
        this.auxVariable.project = this.project;
    }

    addVariableClick(variableName: string) {
        this.auxVariable.variableN = variableName;
        this.newVariable = this.auxVariable;
        if (this.newVariable.variableT === 'Dependiente' && this.newVariable.variableInd === '-') {
            this.newVariable.variableInd = this.independentVariables[0].variableN;
        }
        this.url = environment.restUrl + 'apiVariables/' + this.newVariable.user + '/' + this.newVariable.project +
            '/' + this.newVariable.deviceN + '/' + this.newVariable.deviceH;
        if (this.newVariable.variableN !== '') {
            
            if(this.newVariable.variableN.length<=30){
            
            this.clear();
            this.apiService.addVariable(this.newVariable, this.url).subscribe(resAddVariable => {
                if (resAddVariable.message === 'Saved') {
                    // this.variables.push(this.newVariable);
                    this.displayNewVariable = false;
                    this.getData();
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
      delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    handleChange() {
        
        if (this.selectedValue === 'Dependiente') {
            this.auxVariable.variableT = 'Dependiente';
            this.displayDependentOptions = true;
        } else {
            this.auxVariable.variableT = 'Independiente';
            this.displayDependentOptions = false;
        }
    }

    handleVar(e, variableI: string) {
        this.auxVariable.variableInd = variableI;
    }

    handleConst(e, constant: number) {
        this.auxVariable.constant = constant;
    }

    handleOperation(e, operation: string) {
        this.auxVariable.operation = operation;
    }

    handleDev(e, deviceName: string, deviceHardware: string) {
        this.auxVariable.deviceH = deviceHardware;
        this.auxVariable.deviceN = deviceName;
    }

    handlePositive(e, positive: number) {
        this.auxVariable.positive = positive;
    }

    handleNegative(e, negative: number) {
        this.auxVariable.negative = negative;
    }

    showDev() {
        this.msgsDev.push({
            severity: 'warn',
            summary: 'Para crear la variable es necesario un dispositivo:', 
            detail:'Dirigete a la pestaña de dispositivos para crear uno.'
        });
        
    }

    show() {
        this.msgs.push({
            severity: 'error',
            summary: 'No se ingresó el nombre'
        });
    }

    showLongName() {
        this.msgs.push({
            severity: 'error',
            summary: 'El nombre es demasiado largo'
        });
    }
    showCharacterError() {
        this.msgs.push({
          severity: "error",
          summary: "No se permiten caracteres especiales",
        });
    
      
      }

  hide(){
      this.msgs=[]
      this.counter=0;
  }
    clear() {
        this.displayEditVariable = false;
        this.displayNewVariable = false;
        this.msgs = [];
        this.msgsDev = [];
    }

    changeMode() {
        this.apiService.setNavigationType('takeTour');
        this.router.navigate(['/tourVariables']);
    }
    textOnHover(){
        this.textLabel = "Tutorial de variables"
    }
    textOnLeave(){
        this.textLabel = "Tutorial"
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
