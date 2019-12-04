import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {first} from 'rxjs/internal/operators/first';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: 'sasa',
      email: '123@123s',
      password: '123@123s',
      password_confirmation: '123@123s'
    });
  }

  register() {
    this.authService.register(this.form.value).pipe(
      first(),
      tap(() => {})
    ).subscribe(
      () => {},
      (error: HttpErrorResponse) => this.setErrors(error.error)
      );
  }

  private setErrors(errors: SignUpErrors) {
    Object.keys(errors).forEach(attribute => {
      this.form.get(attribute).setErrors(errors[attribute]);
    });

    // this.form.get(errors.controller).setErrors(errors.message);
    // console.log(this.form.get('email').errors);
  }
}

export interface SignUpErrors {
  name?: string[];
  email?: string[];
  password?: string[];
  password_confirmation?: string[];
}
