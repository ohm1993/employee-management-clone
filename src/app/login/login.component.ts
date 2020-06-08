import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.authenticationService.logout();//to reset login status
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';//get return url from route parameters or default to '/'
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.email, this.model.password)
        .subscribe(
            data => {
                console.log("data value is",data);
                console.log("return url is",this.returnUrl);
                if(this.authenticationService.isAdmin()){
                  this.router.navigateByUrl('/home');
                }else{
                  this.router.navigateByUrl('/profile');
                }
            },
            error => {
                console.log("error is",error);
                this.alertService.error(error);
                this.loading = false;
                this.router.navigateByUrl('/login');
            });
  }

}
