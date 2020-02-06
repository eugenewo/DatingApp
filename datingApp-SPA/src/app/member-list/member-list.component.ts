import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  constructor(private userService:UserService,private alertify:AlertifyService,private router:ActivatedRoute) { }
 users:User[];
  ngOnInit() {
    this.router.data.subscribe(data=>{
      this.users=data['users'];
    });
  }
 


}
