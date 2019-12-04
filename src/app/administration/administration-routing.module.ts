import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainAdministrationComponent} from './main-administration/main-administration.component';
import {AddSliderComponent} from './add-slider/add-slider.component';

const routes: Routes = [
  {path: '', component: MainAdministrationComponent, children: [
      {path: 'add-slider', component: AddSliderComponent}
    ]},
  {}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
