import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient) { }
baseUrl = environment.apiUrl +  'auth/';
helper = new JwtHelperService();
decodedToken:any;

login(model: any)
{
  return this.http.post(this.baseUrl + 'login', model)
  .pipe(
      map( (response: any) => {
        const data = response;
        if (data) { 
          localStorage.setItem('token', data.token); 
          this.decodedToken=this.helper.decodeToken(data.token);
        }
      })
    );
 
}

register(model: any)
{
  return this.http.post(this.baseUrl + 'register', model)
  .pipe(
      map( (response: any) => {
        console.log(response);

      })
    );
 
}

loggedIn(){
  const token=localStorage.getItem('token');
  return !this.helper.isTokenExpired(token);
}

 


}
