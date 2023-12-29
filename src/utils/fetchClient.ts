/* eslint-disable */
import { Department, Employee } from '../types/types';

const BASE_URL = 'https://crud-server-0uze.onrender.com';
// 'https://crud-server-0uze.onrender.com',
// http://localhost:3006

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return fetch(BASE_URL + url, options).then((response) => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}

export const getEmployees = () => request<Employee[]>('/employees');
export const getDepartments = () => request<Department[]>('/departments');
export const addEmployee = (data: any) =>
  request<Employee>('/employees', 'POST', data);
export const patchEmployee = (data: any) =>
  request<Employee>('/employees', 'PATCH', data);
export const removeEmployee = (data: any) =>
  request<Employee>('/employees', 'DELETE', data);
