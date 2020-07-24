import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService{

  constructor(private router: Router, private auth: AuthService) { }

  canActivate(route, state: RouterStateSnapshot){
    return this.auth.user$.pipe(map(user => {
      if (user) {
        return true;
      }

      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return false;
    }));
  }
}
