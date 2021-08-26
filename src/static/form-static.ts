import { FormGroup } from '@angular/forms';

export class FormHelper {
  public static validation_messages = {
    firstName: [{ type: 'required', message: 'First Name is required.' }],
    lastName: [{ type: 'required', message: 'Last Name is required.' }],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Email is not valid.' },
      { type: 'emailTaken', message: 'Email is already taken.' },
    ],
  };

  public static address_validation_messages = {
    street: [{ type: 'required', message: 'Street is required.' }],
    streetNo: [{ type: 'required', message: 'Street Number is required.' }],
    city: [{ type: 'required', message: 'City is required.' }],
    country: [{ type: 'required', message: 'Country is required.' }],
    postalCode: [{ type: 'required', message: 'Postal Code is required.' }],
  };

  public static validationMessagesKeys = Object.keys(
    FormHelper.validation_messages
  );

  public static addressMessagesKeys = Object.keys(
    FormHelper.address_validation_messages
  );

  public static showValidationMessage(
    form: FormGroup,
    controlName: string,
    validationType: string
  ): boolean {
    const control = form.get(controlName);
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }
}
