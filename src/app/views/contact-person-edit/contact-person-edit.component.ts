import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactPerson } from '../../models/interfaces';
import { DataService } from '../../services/data.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormMode } from '../../models/enums';

@Component({
  selector: 'app-contact-person-edit',
  templateUrl: './contact-person-edit.component.html',
  styleUrls: ['./contact-person-edit.component.css'],
})
export class ContactPersonEditComponent implements OnInit, OnDestroy {
  private routeParamsSubscription: Subscription;
  public contactPerson: ContactPerson;
  public formMode: FormMode = FormMode.edit;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public onEditButtonClicked(value: ContactPerson): void {
    this.dataService.setContactPerson(value.uid, value).then(() => {
      this.router.navigate(['/home']);
    });
  }

  private getContactPerson(uid: string): void {
    this.dataService
      .getContactPersonByUid(uid)
      .pipe(take(1))
      .subscribe((person) => {
        this.contactPerson = person;
      });
  }

  ngOnInit(): void {
    this.routeParamsSubscription = this.route.paramMap.subscribe((paramMap) => {
      const contactUid = paramMap.get('uid');
      this.getContactPerson(contactUid);
    });
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
  }
}
