import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { Drivers } from '@ionic/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ContactPersonFormComponent } from './contact-person-form/contact-person-form.component';
import { ContactPersonAddComponent } from './contact-person-add/contact-person-add.component';
import { ContactPersonEditComponent } from './contact-person-edit/contact-person-edit.component';

@NgModule({
  declarations: [AppComponent, ContactPersonFormComponent, ContactPersonAddComponent, ContactPersonEditComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot({
      name: '__contactpersonsdb',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
    }),
    ReactiveFormsModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
