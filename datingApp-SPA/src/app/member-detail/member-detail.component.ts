import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  user:User;
  constructor(private router:ActivatedRoute,private userService:UserService) { }

  ngOnInit() {

    this.getUser();
  }

  getUser(){
   let id= +this.router.snapshot.params['id'];

  this.userService.getUser(id).subscribe((u:User)=>{

    this.user=u;

  },
  error=>{
    console.log(error)
  }
  
  
  );
  }

}
