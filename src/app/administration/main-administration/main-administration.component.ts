import {Component, OnInit} from '@angular/core';



@Component({
  selector: 'app-main-administration',
  templateUrl: './main-administration.component.html',
  styleUrls: ['./main-administration.component.css']
})
export class MainAdministrationComponent implements OnInit {
  panelOpenState = true;
  showFiller = false;
  menu: object = [
    {title: 'Slider', icons: 'fa fa-home', link: '/administration/slider', components: 'app-slider-administration'},
    {title: 'Gallery', icons: 'fa fa-picture-o', link: '/administration/gallery'},
    {title: 'Google Analytics', icons: 'fa fa-area-chart', link: '/administration/dashboard'},
    {title: 'About', icons: 'fa fa-user', link: '/administration/about'},
  ];
  constructor() {
  }


  ngOnInit() {
  }

}




