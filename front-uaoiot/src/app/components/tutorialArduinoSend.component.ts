import { Component } from '@angular/core';

@Component({
    selector: 'app-tutorial-arduino-send',
    templateUrl: '../views/tutorialArduinoSend.component.html',
    styleUrls: ['../styles/tutorialArduinoSend.component.scss']
})

export class TutorialArduinoSendComponent {

    copyToClipboard(inputElement) {
        // alert(element.value);
        inputElement.select();
        document.execCommand('copy');
        inputElement.setSelectionRange(0, 0);
        // this.showToast("info","Credenciales","Texto copiado en el portapapeles.");
    }
}
