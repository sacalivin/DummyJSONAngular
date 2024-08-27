import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailMatchValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (control?.value !== matchingControl?.value) {
      matchingControl?.setErrors({ emailMismatch: true });
      return { emailMismatch: true };
    } else {
      matchingControl?.setErrors(null);
      return null;
    }
  };
}
