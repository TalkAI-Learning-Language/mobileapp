import { apiFetch } from '../index';

export type SignupPayload = {
  email: string;
  password: string;
  name: string;
  native_language: string;
  purpose_language: string;
  reason: string;
  time: number;
};

export type LoginPayload = {
  username: string;
  password: string;
};


export async function signup(payload: SignupPayload) {
  return apiFetch('users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

export async function login({ username, password }: LoginPayload) {
  const params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('username', username);
  params.append('password', password);
  params.append('scope', '');
  params.append('client_id', 'string');
  params.append('client_secret', '********'); // Replace as needed

  return apiFetch('login/access-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      accept: 'application/json',
    },
    body: params.toString(),
  });
}