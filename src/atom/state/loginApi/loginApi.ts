import { atom } from 'jotai';
import axios from 'axios';

interface LoginPayload {
  userName: string;
  password: string;
}

interface User {
  userName: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
}

const savedAuth = localStorage.getItem('auth');

const initialAuth: AuthState = savedAuth
  ? JSON.parse(savedAuth)
  : { token: null, user: null };

export const authAtom = atom<AuthState>(initialAuth);

export const loginAtom = atom(
  null,
  async (_get, set, payload: LoginPayload) => {
    try {
      const res = await axios.post(
        'https://store-api.softclub.tj/Account/login',
        payload
      );

      const token = res.data.data.token;

      const authData: AuthState = {
        token,
        user: {
          userName: payload.userName,
        },
      };

      set(authAtom, authData);
      localStorage.setItem('auth', JSON.stringify(authData));

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          'Ошибка при входе',
      };
    }
  }
);
