import { Component, forwardRef, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contact-person-address-control',
  templateUrl: './contact-person-address-control.component.html',
  styleUrls: ['./contact-person-address-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContactPersonAddressControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ContactPersonAddressControlComponent),
      multi: true,
    },
  ],
})
export class ContactPersonAddressControlComponent
  implements OnInit, ControlValueAccessor
{
  private readonly INVALID_FORM_NAME: string = 'INVALID';

  public addressForm: FormGroup;

  validateFn: ValidatorFn;

  constructor(private fb: FormBuilder) {
    this.validateFn = (c: AbstractControl): ValidationErrors | null =>
      this.addressForm.status == this.INVALID_FORM_NAME
        ? {
            valid: false,
          }
        : null;
  }

  public onTouched: () => void = () => {};

  writeValue(val: any): void {
    val && this.addressForm.setValue(val, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.addressForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.addressForm.disable() : this.addressForm.enable();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.validateFn ? this.validateFn(control) : null;
  }

  private createForm(): void {
    this.addressForm = this.fb.group({
      street: new FormControl('', Validators.required),
      streetNo: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.createForm();
  }
}
