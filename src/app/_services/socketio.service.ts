import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';


@Injectable()
export class SocketioService {
  socket;
  constructor() {}
  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    
    this.socket.emit('my message', 'Hello there from Angular.');
    
    this.socket.on('shownotification',function(message){
        console.log("show notification message is",message);
    });

    this.socket.on("messageSent", function (message) {
     
    });
  }
}
