import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { ContactPersonComponent } from '../../blocks/contact-person/contact-person.component';
import { GetContactGroupKeysPipe } from '../../pipes/get-contact-group-keys.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, ContactPersonComponent, GetContactGroupKeysPipe]
})
export class HomePageModule {}
