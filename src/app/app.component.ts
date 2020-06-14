import { Component, ViewChild } from '@angular/core';
import { ToastComponent } from '@syncfusion/ej2-angular-notifications';
import { SocketioService } from './_services/index';
import { environment } from '../environments/environment';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  @ViewChild('defaultToast')
  public toastObj: ToastComponent;
  public position1: Object = {  X: "Right" };
  socket:any = {};

  constructor(private socketService: SocketioService) {}

  ngOnInit() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.on('shownotification', (message) => {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            if(user.role == "admin" && message.user.role == "employee"){
                setTimeout(()=>{
                   this.toastObj.show();
                },200);
            }
    });
  }
}