import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AlertService } from '../_services/index';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  private subscription: Subscription;
  message: any;
  constructor(private alertService: AlertService) { 
    this.subscription = alertService.getMessage().subscribe(message => { this.message = message; });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    // unsubscribe on destroy to prevent memory leaks
    this.subscription.unsubscribe();
  }

}
