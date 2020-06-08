import { Component, ViewChild } from '@angular/core';
import { ToastComponent } from '@syncfusion/ej2-angular-notifications';
//import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  {
  @ViewChild('defaultToast')
  public toastObj: ToastComponent;
  public position1: Object = {  X: "Right" };
  ngOnInit() {
      // setTimeout(()=>{
      //   this.toastObj.show();
      // },200);
  }
}