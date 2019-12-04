import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../api.service';
import {UserModel} from '../../models/UserModel';
import {Observable} from 'rxjs';
import {GetUserByTokenService} from '../../services/get-user-by-token.service';
import {GetAllTypesAlbumService} from '../../services/getAllTypesAlbum.service';
import {AlbumTypeModel} from '../../models';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
   user: Observable<UserModel[]>;
   albumTypes: Observable<AlbumTypeModel[]>;

  constructor(private getUserByToken: GetUserByTokenService, private getAllTypeAlbumsService: GetAllTypesAlbumService) {
  }

  ngOnInit() {
    this.user = this.getUserByToken.getUser();
    this.albumTypes = this.getAllTypeAlbumsService.getAllTypeAlbums();
  }
}
