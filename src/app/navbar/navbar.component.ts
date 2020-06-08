import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/index';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  returnUrl: string;
  constructor(
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();//to reset login status
    this.router.navigateByUrl('/login');
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
    // this.authService.logout();
  }

}
