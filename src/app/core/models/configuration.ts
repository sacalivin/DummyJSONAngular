import { ApplicationPurpose } from './applicationPurpose';
import { Country } from './country';

export interface Configuration {
  countries: Country[];
  documentTypes: DocumentType[];
  applicationPurposes: ApplicationPurpose[];
}
