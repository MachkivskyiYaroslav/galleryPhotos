import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from './token-storage.service';
import {filter, map, tap} from 'rxjs/operators';
import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private apiTokenName = 'token';

  constructor(private tokenStorage: TokenStorageService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenStorage.token(); // check const
    if (token) {
      req = req.clone({setHeaders: {Authorization: `Bearer ${token}`}});
    }
    return next.handle(req).pipe(
      filter(response => response instanceof HttpResponse),
      tap(
        (response: HttpResponse<any>) => {
          if (response.body.token) {
            this.tokenStorage.setToken(response.body.token);
          }
        },
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.tokenStorage.deleteToken();
            this.router.navigateByUrl('/sign-in');
          }
        }
        )
    );

  }
}
