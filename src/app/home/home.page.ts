import { Component } from '@angular/core';
import { ContactPerson, GroupedContactPersons } from '../models/interfaces';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private data: DataService) {}

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  getGroupedContacts(): GroupedContactPersons {
    return this.data.getGroupedContactPersons(); 
  }

  onAddButtonClicked(): void {
    
    // this.data.addContactPerson();
  }

  onDeletePersonClicked(index: number): void {
    this.data.removeContactPerson(index);
  }

}
