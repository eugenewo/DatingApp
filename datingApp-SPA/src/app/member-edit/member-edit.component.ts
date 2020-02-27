import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/user';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  constructor(private route:ActivatedRoute,private userService:UserService,private authService:AuthService) { }
  photoUrl:string;
  user:User;
  @ViewChild('editForm') editForm:NgForm;

  ngOnInit() {
   this.route.data.subscribe(data=>{
  this.user=data['user'];

   });
   this.authService.photoUrl.subscribe(p => this.photoUrl = p);
  }

  updateUser(){

    this.userService.updateUser(this.authService.decodedToken.nameid,this.user).subscribe(data=>{
      console.log(this.user)
      this.editForm.reset(this.user);
    },
    error=>{console.log(error)}
    )



  }
  updateMainPhoto(photoUrl:string){
    this.user.photoUrl=photoUrl;
  }

}
