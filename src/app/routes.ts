import { Routes } from '@angular/router';
import { ContactPersonAddComponent } from './contact-person-add/contact-person-add.component';
import { ContactPersonEditComponent } from './contact-person-edit/contact-person-edit.component';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'contact-person/add',
    component: ContactPersonAddComponent,
  },
  {
    path: 'contact-person/:uid',
    component: ContactPersonEditComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
