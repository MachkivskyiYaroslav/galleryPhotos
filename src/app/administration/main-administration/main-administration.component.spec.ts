import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAdministrationComponent } from './main-administration.component';

describe('MainAdministrationComponent', () => {
  let component: MainAdministrationComponent;
  let fixture: ComponentFixture<MainAdministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainAdministrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
