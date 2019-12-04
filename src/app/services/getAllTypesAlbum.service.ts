import { Injectable } from '@angular/core';
import {AlbumTypeModel} from '../models';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAllTypesAlbumService {
  constructor(private http: HttpClient) { }
  public getAllTypeAlbums(): Observable<AlbumTypeModel[]> {
    return this.http.get<AlbumTypeModel[]>('http://localhost:3000/api/getAllTypesAlbums');
  }
}
