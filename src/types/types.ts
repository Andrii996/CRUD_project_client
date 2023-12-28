export interface Employee {
  employee(employee: any): unknown;
  name: string;
  surname: string;
  _id: string;
  email: string;
  department: string;
}

export interface Department {
  name: string;
  _id: string;
}

export interface PreparedDeps {
  label: string;
  value: string;
}
