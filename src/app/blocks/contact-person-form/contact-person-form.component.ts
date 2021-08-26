import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormHelper } from 'src/static/form-static';
import { FormMode } from '../../models/enums';
import { ContactPerson } from '../../models/interfaces';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-contact-person-form',
  templateUrl: './contact-person-form.component.html',
  styleUrls: ['./contact-person-form.component.css'],
})
export class ContactPersonFormComponent implements OnInit {
  public contactsForm: FormGroup;
  public formHelper = FormHelper;
  public validationKeys: string[] = FormHelper.validationMessagesKeys;
  public addressValidationKeys: string[] = FormHelper.addressMessagesKeys;
  public validationMessages = FormHelper.validation_messages;
  public addressValidationMessages = FormHelper.address_validation_messages;

  @Input() contactPerson: ContactPerson;
  @Input() formMode: FormMode = FormMode.add;

  @Output() contactChanged: EventEmitter<ContactPerson> =
    new EventEmitter<ContactPerson>();

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  public logForm(): void {
    const contact: ContactPerson = {
      ...this.contactsForm.value,
      uid: this.isEditMode() ? this.contactPerson.uid : '',
    };
    this.contactChanged.emit(contact);
  }

  private isEmailTaken(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Promise<{ [key: string]: any } | null> => {
      if (!this.isEditMode() || control.value !== this.contactPerson?.email) {
        return this.dataService
          .isEmailTaken(control.value)
          .then((isEmailTaken) => {
            if (isEmailTaken) {
              return { emailTaken: control.value };
            }
            return null;
          });
      }
      return Promise.resolve(null);
    };
  }

  private isEditMode(): boolean {
    return this.formMode === FormMode.edit;
  }

  private createForm(): void {
    this.contactsForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ],
        [this.isEmailTaken()]
      ),
      address: new FormControl(''),
    });
  }

  private setValuesInEditMode(): void {
    if (this.isEditMode() && this.contactPerson) {
      this.contactsForm.setValue({
        firstName: this.contactPerson.firstName,
        lastName: this.contactPerson.lastName,
        email: this.contactPerson.email,
        address: this.contactPerson.address,
      });
    }
  }

  ngOnInit(): void {
    this.createForm();
    this.setValuesInEditMode();
  }
}
