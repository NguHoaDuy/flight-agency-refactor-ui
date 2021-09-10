import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const EmailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  // console.log(`value valid: ${control.value}`);
  // for (const key in control.value) {
  //   console.log(`valid: key: ${key}`);
  // }
  const regex = /^([-\w.])+[a-zA-Z\d]@(\w+\.)+(\w+)$/;
  const verification = control.value;
  const isValid = regex.test(verification);
  // console.log(`valid: ${isValid}`);
  return isValid ? null : { format: true };
};

export const PasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const verification = control.value;
  const isTheSame = verification.input == verification.confirm;
  return isTheSame ? null : { notMatch: true };
};

// flight schedule search form
export const compare: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  const verification = control.value;
  const roundTrip = verification.isRoundTrip;
  const d1 = new Date(verification.depDate); // ten cua form control.
  const d2 = new Date(verification.retDate);
  if (d1.valueOf() > d2.valueOf() && roundTrip) {
    return { date: true };
  }
  if (d1.toString() == "Invalid Date" || ( d2.toString() == "Invalid Date" && roundTrip)){
    return { date: true };
  }
  if (verification.babies > verification.adults) {
    return { person: true }
  }
  return null;
};
