import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

/** A hero's name can't match the hero's alter ego */
export const IdentificationDocumentValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const documentType = control.get('documentType');
  const DocumentNumber = control.get('documentNumber');

  if (documentType?.value.toLocaleLowerCase() == 'passport') {
    return null;
  }

  let error =
    documentType &&
    DocumentNumber &&
    DocumentIsInValid(documentType.value, DocumentNumber.value)
      ? {
          identificationDocument: true,
        }
      : null;

  //console.error(control.errors);
  return error;
};

function DocumentIsInValid(
  documentType: string,
  documentNumber: string
): boolean {

  if (
    ((documentType.toLocaleLowerCase() == 'nationalid' ||
      documentType.toLocaleLowerCase() == 'national id') &&
      !new RegExp('^[0-9]{5,9}$').test(documentNumber)) ||
    ((documentType.toLocaleLowerCase() == 'alienid' ||
      documentType.toLocaleLowerCase() == 'alien id') &&
      !new RegExp('^[0-9]{4,8}$').test(documentNumber)) ||
    ((documentType.toLocaleLowerCase() == 'kenyan passport number' ||
      documentType.toLocaleLowerCase() == 'kenyan passport number') &&
      !new RegExp('^(ke|KE)[a-zA-Z0-9]*$').test(documentNumber)) ||
    ((documentType.toLocaleLowerCase() == 'foreign passport number' ||
      documentType.toLocaleLowerCase() == 'foreign passport number') &&
      !new RegExp('^[a-zA-Z0-9]*$').test(documentNumber))
  ) {
    //did not match pattern well return error true
    return true;
  } else {
    // no error
    return false;
  } 
    
}
