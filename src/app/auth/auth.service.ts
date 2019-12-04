import { Injectable } from '@angular/core';
import {ApiService} from '../api.service';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {UserModel} from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService) { }
  register(registerForm: IRegisterForm): Observable<AuthResponse> {
    return this.api.post('users', registerForm)
      .pipe(map(response => response.token));
  }
  signIn(signInForm: SignInForm): Observable<AuthResponse> {
    return this.api.post('auth', signInForm)
      .pipe(map(response => response));
  }
  signInLikeAdmin(signInForm: SignInForm): Observable<AuthResponse> {
    return this.api.post('admin/auth-mode-admin', signInForm)
      .pipe(
        map((response => response))
      );
  }
}

export interface ApiResponse<T> {
  data: T;
}

export interface IRegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  user: UserModel;
}

export interface SignInForm {
  email: string;
  password: string;
}
