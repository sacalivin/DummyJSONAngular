import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appEmailConfirmationValidation]',
  standalone: true,
})
export class EmailConfirmationValidationDirective {
  @Input('appEmailMatch') controlToMatch: string = '';

  validate(control: AbstractControl): ValidationErrors | null {
    //console.error("We are checking it")
    if (!this.controlToMatch) {
      throw new Error('Input control name to match is required');
    }

    const matchingControl = control.root.get(this.controlToMatch);

    if (!matchingControl) {
      throw new Error(`Matching control '${this.controlToMatch}' not found`);
    }

    if (control.value !== matchingControl.value) {
      return { emailMatch: true };
    }

    return null;
  }
}
