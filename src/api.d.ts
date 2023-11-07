declare namespace Api {

  interface Response {
    data: any;
    status: number;
    success?: boolean;
  }

  interface Company {
    direction: string;
    logo: string;
    name: string;
    phone: string;
    website: string;
  }

  interface Consultant {
    id: string;
    notes?: {};
    company?: string;
    date?: Date;
    email?: string;
    gender?: string;
    group?: unknown[];
    lastName?: string;
    names?: string;
    nationality?: string;
    partner?: unknown[];
    phone?: string;
    scdLastName?: string;
  }
  interface User {
    avatar: string;
    birthDate: Date;
    country: string;
    email: string;
    firstName: string;
    gender: string;
    id: number;
    lastName: string;
    phone: string;
    scdLastName: string;
  }

  interface Guest {
    name: string;
    date: Date;
  }

  interface License {
    id: number;
    status: 0 | 1;
  }

  interface User {
    avatar: string;
    birthDate: Date;
    country: string;
    email: string;
    firstName: string;
    gender: string;
    id: number;
    lastName: string;
    phone: string;
    scdLastName: string;
  }

  interface UserResponse {
    app_version: string;
    company: Company;
    consultants: Consultant[];
    guests: Guest[];
    license: License;
    token: string;
    user: User;
  }

}
