import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl + 'auth/';
  helper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  photoUrl=new BehaviorSubject<string>('../../assets/noimage.png');
  //currentPhotoUrl=this.photoUrl.asObservable();

changeMemberPhoto(photoUrl:string){
this.photoUrl.next(photoUrl);
}


  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const data = response;
        if (data) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.userForToken));
          this.decodedToken = this.helper.decodeToken(data.token);
          this.currentUser = data.userForToken;
          this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model).pipe(
      map((response: any) => {
        console.log(response);
      })
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.helper.isTokenExpired(token);
  }
}
