import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  helper = new JwtHelperService();

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.authServ.decodedToken = this.helper.decodeToken(token);
    const user: User = JSON.parse(localStorage.getItem('user'));

    if (user) {
      this.authServ.currentUser = user;
      this.authServ.changeMemberPhoto(user.photoUrl);
    }



  }
  constructor(private authServ: AuthService) { }
}
