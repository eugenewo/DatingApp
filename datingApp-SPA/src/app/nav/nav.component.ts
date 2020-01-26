import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

model:any={};
username:string='';


  constructor(public authServ: AuthService,private notifications:AlertifyService) { }

  ngOnInit() {
  }

login() {
  this.authServ.login(this.model).subscribe(next => {
  this.notifications.success('logged in');
 

  });
}
loggedIn(){
   
  return this.authServ.loggedIn();
}

logout(){
  localStorage.removeItem('token');
  this.notifications.success('logged out !!!!');
}
 

}
