import LoginRegisterSuccess from '../interfaces/client/LoginRegisterSuccess';
import Session from '../interfaces/shared/session';

/* eslint-disable no-undef */
export interface SuccessfulResponse<Data extends Record<string, any>> {
  error: false,
  result: Data,
}

export interface ErrorResponse {
  error: {
    code: string,
    message: string,
  },
  result: null,
}

// generic response. used for routes that don't return anything
// interface Ok {
//   [key: string]: unknown,
// }

type RequestResponse<Data extends Record<string, any>> =
  | SuccessfulResponse<Data>
  | ErrorResponse;

export const request = async <Data extends Record<string, any>>(
  url: string, data?: object, options?: RequestInit,
): Promise<RequestResponse<Data>> => {
  const headers = options?.headers ? new Headers(options.headers) : new Headers();
  const token = window.localStorage.getItem('token');
  const serialized = data ? JSON.stringify(data) : null;
  const method = options?.method ?? (data ? 'POST' : 'GET');

  if (!(data instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const { error, result } = await window.fetch(url, {
    ...options,
    method,
    body: data instanceof FormData ? data : serialized,
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then((e) => e.json());

  if (error) {
    return <ErrorResponse>{ error: { code: error.code, message: error.message } };
  }

  return <SuccessfulResponse<Data>>{ result };
};

export default class Api {
  static session: Session | null = null;

  static async login(
    username: string,
    password: string,
  ): Promise<RequestResponse<LoginRegisterSuccess>> {
    return request<LoginRegisterSuccess>('/api/login', { username, password });
  }

  static async register(
    username: string,
    email: string,
    password: string,
  ): Promise<RequestResponse<LoginRegisterSuccess>> {
    return request<LoginRegisterSuccess>('/api/register', {
      username, email, password,
    });
  }

  /* private routes */

  static async getSession(): Promise<RequestResponse<Session>> {
    return request<Session>('/api/@me');
  }

  static getToken(): string | null {
    return window.localStorage.getItem('token');
  }

  static logout(): void {
    window.localStorage.removeItem('token');
    window.location.href = '/';
  }

  static updateProfilePicture(file: File) {
    const formData = new FormData();
    formData.append('pp', file);

    return request('/api/@me/avatar', formData, { method: 'PUT' });
  }
}
