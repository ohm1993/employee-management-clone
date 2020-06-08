import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from '../_services/index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  model: any = {};
  public user = {
    _id: '',
    name: '',
    email: '',
    password : '',
    role: ''
    }
  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loadProfileData();
  }

  loadProfileData(){
    const user = JSON.parse(localStorage.getItem('currentUser'));
    // console.log("profile data user value is",user);
    // //const currentUser = JSON.parse(user._body);
    this.userService.getById(user._id)
        .subscribe(
          user => {
            console.log("profile data is",user);
            //this.user = user;
          },
          error => {
              this.alertService.error(error);
          });
  } 

  updateUser() {
    console.log("this user value is",this.user);
    this.userService.update(this.user)
      .subscribe(
          data => {
            this.alertService.success('Profile Updated successful', true);
          },
          error => {
             console.log("error is",error);
              this.alertService.error(error);
          });
  }

}
