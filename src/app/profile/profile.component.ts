import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from '../_services/index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  model: any = {};
  user:any = {};
  // public user = {
  //   _id: '',
  //   name: '',
  //   email: '',
  //   password : '',
  //   role: ''
  //   }
  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loadProfileData();
  }

  loadProfileData(){
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getById(user._id)
        .subscribe(
          user => {
            console.log("loadProfileData user value is",user);
            this.user = user;
          },
          error => {
              this.alertService.error(error);
          });
  } 

  updateUser() {
    console.log("updateUser user value is",this.user);
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
