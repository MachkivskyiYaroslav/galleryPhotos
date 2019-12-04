import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../models';

@Injectable({
  providedIn: 'root'
})
export class GetUserByTokenService {

  constructor(private httpClient: HttpClient) {

  }
  public getUser(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>('http://localhost:3000/getUserFromToken');
  }
}
