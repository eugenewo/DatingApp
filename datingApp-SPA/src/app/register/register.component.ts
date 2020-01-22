import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
model:any={};
@Output() cancelRegister = new EventEmitter();

  constructor(private authSrv:AuthService) { }

  ngOnInit() {
  }

  register(){
    this.authSrv.register(this.model).subscribe(
() =>
{ console.log('register success')},
error=>{ console.log(error)}
);
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log('registration was cancelled');
  }

}
