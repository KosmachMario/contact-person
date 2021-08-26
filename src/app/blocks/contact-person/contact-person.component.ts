import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { ContactPerson } from '../../models/interfaces';

@Component({
  selector: 'app-contact-person',
  templateUrl: './contact-person.component.html',
  styleUrls: ['./contact-person.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPersonComponent implements OnInit {
  @Input() contactPerson: ContactPerson;
  @Output() deletePersonClicked: EventEmitter<string> =
    new EventEmitter<string>();

  get fullName(): string {
    return `${this.contactPerson.firstName} ${this.contactPerson.lastName}`;
  }

  get fullAddress(): string {
    return `${this.contactPerson.address.street} ${this.contactPerson.address.streetNo}, ${this.contactPerson.address.city} - ${this.contactPerson.address.country}, Zip: ${this.contactPerson.address.postalCode}`;
  }

  constructor(private router: Router) {}

  ngOnInit() {}

  isIos() {
    const win = window as any;
    return win && win.Ionic && win.Ionic.mode === 'ios';
  }

  public onDeleteClicked(contactUid: string): void {
    this.deletePersonClicked.emit(contactUid);
  }

  public onEditClicked(): void {
    this.router.navigateByUrl(`/contact-person/${this.contactPerson.uid}`);
  }
}
