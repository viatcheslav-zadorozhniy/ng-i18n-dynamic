export type Gender = 'male' | 'female';

export interface User {
  firstName: string;
  lastName: string;
  gender: Gender;
  email?: string;
}
