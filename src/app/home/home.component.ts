import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../_models/index';
import { AlertService, UserService } from '../_services/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit { 
  users : any = [];
  searchString: string;
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
  ) {}
  
  ngOnInit() {
    this.loadLists();
  }
  
 loadLists(){
    this.userService.getAll().subscribe(
        res => {
          this.users = res;
        }
     );
  } 
  
  sendEmail(opname: string){
    this.userService.sendMail(opname)
          .subscribe(
          data => {
            this.alertService.success('Mail Send successful', true);
          },
          error => {
              this.alertService.error(error);
          });
  }
  editUser(UserId: string) {  
      this.userService.getById(UserId)
      .subscribe(
          user => {
            const opname = "edited";
            //this.user = user;
            this.sendEmail(opname);
          },
          error => {
              this.alertService.error(error);
          });
  }  

  deleteUser(UserId: string) {  
    this.userService.delete(UserId)
    .subscribe(
        data => {
          const opname = "deleted";
          this.alertService.success('Deleted successfully', true);
          this.loadLists();
          this.sendEmail(opname);
        },
        error => {
            this.alertService.error(error);
        });
  } 
  
  addUser() {  
    this.userService.create(this.model)
      .subscribe(
          data => {
            const opname = "add";
            this.alertService.success('Registration successful', true);
            this.loadLists();
            this.sendEmail(opname);
          },
          error => {
              this.alertService.error(error);
          });
  }

  updateUser() {
    this.userService.update(this.user)
      .subscribe(
          data => {
            const opname = "update";
            this.alertService.success('Employee Updated successful', true);
            this.sendEmail(opname);
            this.loadLists();
           
          },
          error => {
             console.log("error is",error);
              this.alertService.error(error);
          });
  }

}
