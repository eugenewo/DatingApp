import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  username: string = '';
  photoUrl: string;


  constructor(public authServ: AuthService, private notifications: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.authServ.photoUrl.subscribe(p => this.photoUrl = p);
  }

  login() {
    this.authServ.login(this.model).subscribe(next => {
      this.notifications.success('logged in');
      this.router.navigate(['/members']);

      
    });
  }
  loggedIn() {

    return this.authServ.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authServ.decodedToken = null;
    this.authServ.currentUser = null;
    this.notifications.success('logged out !!!!');
    this.router.navigate(['/home']);
  }


}
