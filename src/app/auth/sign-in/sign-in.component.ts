import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {finalize, first} from 'rxjs/operators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  signIn() {
    this.form.disable();
    this.authService.signIn(this.form.value)
      .pipe(
        first(),
        finalize(() => {
          this.form.enable();
        })
      )
      .subscribe(
        () => this.router.navigateByUrl('/')
      );
  }
  signInLikeAdmin() {
    this.authService.signInLikeAdmin(this.form.value)
      .pipe(
        first(),
        finalize(() => {
          this.form.enable();
        })
      )
      .subscribe(
        () => this.router.navigateByUrl('/')
      );
  }

  login() {
    if (this.router.url === '/admin/auth-mode-admin') {
      this.signInLikeAdmin();
    } else {
      this.signIn();
    }
  }

}
