import { Routes } from '@angular/router';
import { ContactPersonAddComponent } from '../views/contact-person-add/contact-person-add.component';
import { ContactPersonEditComponent } from '../views/contact-person-edit/contact-person-edit.component';
import { StorageResolver } from '../resolvers/storage.resolver';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('../views/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'contact-person/add',
    component: ContactPersonAddComponent,
  },
  {
    path: 'contact-person/:uid',
    resolve: { storage: StorageResolver },
    component: ContactPersonEditComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
