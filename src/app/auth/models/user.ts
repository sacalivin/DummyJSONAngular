export enum Roles {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NULL = '',
}
export class User { 
  username: string = '';
  lastName: string = '';
  firstName: string = '';
  middleName: string = '';
  documentNumber: string = '';
  documentType: string = '1';
  email: string = '';
  password: string = '';
  phone: string = '';
  id: string = '';
  role: Roles = Roles.USER;
  countryOfBirth: string = '';
  consent: boolean = true;
  gender: Gender = Gender.NULL;
}
