import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  helper = new JwtHelperService();

  ngOnInit(): void {
    const token=localStorage.getItem('token');
    this.authServ.decodedToken=this.helper.decodeToken(token);
    
  }
  constructor(private authServ: AuthService) { } 
}
