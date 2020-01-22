import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient) { }
baseUrl = 'http://localhost:5002/auth/';


login(model: any)
{
  return this.http.post(this.baseUrl + 'login', model)
  .pipe(
      map( (response: any) => {
        console.log(response);
        const data = response;
        if (data) { localStorage.setItem('token', data.token); }
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



}
