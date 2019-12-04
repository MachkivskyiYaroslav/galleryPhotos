import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AdministrationRoutingModule } from './administration-routing.module';
import { MainAdministrationComponent } from './main-administration/main-administration.component';
import { AddSliderComponent } from './add-slider/add-slider.component';
import {PhotoResponsiveService} from '../services/photo-responsive.service';
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule, MatProgressBarModule, MatSelectModule,

} from '@angular/material';
import { ValidationErrorsComponent } from './validation-errors/validation-errors.component';
import {AddPhotoService} from './administration-services/add-photo.service';
import { ResponsiveDirective } from './responsive.directive';



@NgModule({
  declarations: [MainAdministrationComponent, AddSliderComponent, ValidationErrorsComponent, ResponsiveDirective],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSelectModule
  ],
  providers: [PhotoResponsiveService, AddPhotoService]
})
export class AdministrationModule { }
