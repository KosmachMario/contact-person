import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupedContactPersons } from '../../models/interfaces';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public groupedContacts$: Observable<GroupedContactPersons>;

  constructor(private dataService: DataService) {}

  public refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  public onDeletePersonClicked(personUid: string): void {
    this.dataService.removeContactPerson(personUid);
  }

  ngOnInit() {
    this.groupedContacts$ = this.dataService.groupedContactPersons$;
  }
}
