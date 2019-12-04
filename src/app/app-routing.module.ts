import {Routes} from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component';

export const routes: Routes = [
  {path: '', component: HomePageComponent},
  // {path: 'auth', loadChildren: 'src/app/auth/auth.module#AuthModule'},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'administration', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule)}
  // {path: 'admin/auth-mode-admin', loadChildren: 'src/app/auth/auth.module#AuthModule'},
  // {path: 'auth', children: [
  //
  //   ]}
];
