export interface AlbumModel {
  id: number;
  type_album_id: number;
  album_title: string;
  album_about: string;
  cover_photo_path: string;
  shooting_date: string;
  alt: string;
  album_path: string;
  AlbumType: {  /*include model */
    type: string;
  };
}


