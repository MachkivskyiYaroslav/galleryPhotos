import { Injectable } from '@angular/core';
import {PhotoResponsiveModel} from '../models';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoResponsiveService {
  constructor(private http: HttpClient) { }
  public getAllTypesResponsive(): Observable<PhotoResponsiveModel[]> {
    return this.http.get<PhotoResponsiveModel[]>(`${environment.baseUrl}/api/getAllResponsiveStatus`);
  }
}
