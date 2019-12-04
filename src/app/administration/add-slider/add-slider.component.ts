import {Component, Input, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PhotoResponsiveService} from '../../services/photo-responsive.service';
import {FileUploadModel, PhotoResponsiveModel, PhotoModel} from '../../models';
import {Observable, of} from 'rxjs';
import {AddPhotoService} from '../administration-services/add-photo.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ResponsiveDirective} from '../responsive.directive';

@Component({
  selector: 'app-add-slider',
  templateUrl: './add-slider.component.html',
  styleUrls: ['./add-slider.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({opacity: 100})),
      transition('* => void', [
        animate(300, style({opacity: 0}))
      ])
    ])
  ],
})
export class AddSliderComponent implements OnInit {
  @Input() accept = 'image/*';
  photoInfo: PhotoModel;
  userForm: FormGroup;
  selectedFile: File = null;
  responsiveModel: Observable<PhotoResponsiveModel[]>;
  files = this.addPhotoService.files;
  previewUrl = [];
  arrayValues = [];
  default = '3';
  valueResponsive: string;

  constructor(
    private formBuilder: FormBuilder,
    private photoResponsiveService: PhotoResponsiveService,
    private addPhotoService: AddPhotoService,
    private renderer: Renderer2) {
  }

  getResponsiveStatus() {
    this.responsiveModel = this.photoResponsiveService.getAllTypesResponsive();
  }

  ngOnInit() {
    this.getResponsiveStatus();
    this.userForm = this.formBuilder.group({
      album_id: '',
      title: ['', [Validators.required]],
      alt: ['', [Validators.required, Validators.minLength(5)]],
      album_link: ['', [Validators.required, Validators.minLength(5)]],
      fileUpload: ['', [Validators.required]],
      photo_responsive_status: ['', Validators.required]
    });
    of(this.photoResponsiveService.getAllTypesResponsive().subscribe(values => {
      this.arrayValues = values;
      this.userForm.get('photo_responsive_status').patchValue(this.arrayValues[2].id);
    }));
  }

  onClick(fileUpload) {
    this.addPhotoService.onClick(fileUpload);
    this.previewUrl = this.addPhotoService.previewUrl;
    console.log(this.previewUrl);
  }

  uploadFiles(fileUpload) {
    const fd = new FormData();
    for (let i = 0; i < Object.keys(this.userForm.value).length; i++) {
      fd.append(`${Object.keys(this.userForm.value)[i]}`, `${Object.values(this.userForm.value)[i]}`);
    }
    fd.append('photo', this.selectedFile);
    // console.log('files', this.userForm.get('album_id').value);
    this.addPhotoService.uploadFile(fileUpload, fd);
    // console.log(this.selectedFile);
    // console.log(fileUpload);
    // console.log(this.userForm.value);
  }

  retryFile(file: FileUploadModel) {
  }

  cancelFile(file: FileUploadModel) {
  }

  fileSend(fileInput: any) {
    this.selectedFile = <File> fileInput.target.files[0];
  }

  hello(el) {
    alert(el.value);
  }
}
