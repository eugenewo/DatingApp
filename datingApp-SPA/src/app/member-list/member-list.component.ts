import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  constructor(private userService:UserService,private alertify:AlertifyService) { }
 users:User[];
  ngOnInit() {
    this.loadUsers();
  }

loadUsers(){
this.userService.getUsers().subscribe((response:User[])=>
  {
    this.users=response;
  },
  error=>{
this.alertify.error(error);
  }
  
  );
}



}
