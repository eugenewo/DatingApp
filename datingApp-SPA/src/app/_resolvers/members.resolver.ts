import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable()
export class MembersResolver implements Resolve<User[]> {
  resolve(
    route:ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.getUsers().pipe(
      catchError(error => {
        this.alertify.error('problem retrieving user data -getUsers function');
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}
}
