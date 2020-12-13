import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<IUser>(null);
  currentUser = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }


  login(value: any) {
    this.http.post(this.baseUrl + 'account/login', value).pipe(
      map((user: IUser) => {
        this.currentUserSource.next(user);
        localStorage.setItem('token', user.token);
      })
    );
  }

  register(value: any) {
    this.http.post(this.baseUrl + 'account/register', value).pipe(
      map((user: IUser) => {
        localStorage.setItem('token', user.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string) {
    return this.http.get(this.baseUrl + 'account/emailexists?email=' + email);
  }

}
