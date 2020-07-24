import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService{

  constructor(private userService: UserService, private auth: AuthService, private router: Router) { }

  // canActivate(): Observable<boolean>{
  //   return this.auth.user$.pipe(switchMap(user => {
  //     this.userService.get(user.uid);
  //   }));
  // }
}
