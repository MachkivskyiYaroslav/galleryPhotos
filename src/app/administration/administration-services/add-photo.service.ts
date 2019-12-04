import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEventType, HttpRequest} from '@angular/common/http';
import {FileUploadModel} from '../../models';
import {environment} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {tap} from 'rxjs/internal/operators/tap';
import {last} from 'rxjs/internal/operators/last';
import {of} from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AddPhotoService {
  public files: Array<FileUploadModel> = [];
  url = `${environment.baseUrl}/test`;
  private complete: any;
  previewUrl = [];

  constructor(private http: HttpClient) {
  }

  onClick(fileUpload) {
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        const mimetype = file.type;
        if (mimetype.match(/image\/*/) == null) {
          alert('Only images');
        } else {
          this.files.push({
            data: file, state: 'in',
            inProgress: false, progress: 0, canRetry: false, canCancel: true
          });

          // preview photo
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.previewUrl.unshift(reader.result);
          };
        }
      }
    };
    fileUpload.click();
  }
  cancelFile(file: FileUploadModel) {
    // file.sub.unsubscribe();
    this.removeFileFromArray(file);
  }

  retryFile(file: FileUploadModel) {
    this.uploadFile(file, FormData);
    file.canRetry = false;
  }

  public uploadFile(file: FileUploadModel, FormData) {
    const req = new HttpRequest('POST', this.url, FormData, {
      reportProgress: true
    });
    file.inProgress = true;
    file.sub = this.http.request(req).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      tap(message => {
      }),
      last(),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        file.canRetry = true;
        return of (console.log(error));
        alert('error');
        // return of(`${file.data.name} upload failed.`);
      })
    ).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          this.removeFileFromArray(file);
          this.complete.emit(event.body);
        }
      }
    );
  }
  public uploadFiles(fileUpload: HTMLInputElement, FormData) {
    fileUpload.value = '';
    this.files.forEach(file => {
      this.uploadFile(file, FormData);
    });
  }
  private removeFileFromArray(file: FileUploadModel) {
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }
}

