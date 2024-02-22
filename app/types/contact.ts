export interface Contact {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  contactType: string | 'Work' | 'Personal' | 'Random';
}
