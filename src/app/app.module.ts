import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { HttpClientModule }    from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; 
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, SocketioService } from './_services/index';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from './alert/alert.component';
import { ShowAuthedDirective } from './shared/show-authed.directive';
import { ProfileComponent } from './profile/profile.component';
import { FilterPipe } from './pipe/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    AlertComponent,
    ShowAuthedDirective,
    ProfileComponent,
    ProfileComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ToastModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    SocketioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
