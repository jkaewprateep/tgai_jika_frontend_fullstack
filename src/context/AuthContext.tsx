'use client';

import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import axios from 'axios';

interface User {
  id: string;
  username: string;
  email: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  phone_number?: string;
  credit_card?: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  register: (
    username: string,
    email: string,
    password: string,
    confirm_password: string
  ) => Promise<void>;
  updateUser: (updatedUser: Partial<User>) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const SECRET_KEY = CryptoJS.enc.Utf8.parse(
  process.env.NEXT_PUBLIC_AES_SECRET_KEY || ''
);
const IV = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_AES_IV || '');

function encryptPassword(password: string | CryptoJS.lib.WordArray) {
  const encrypted = CryptoJS.AES.encrypt(password, SECRET_KEY, {
    iv: IV,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

const authAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL as string,
});

authAxios.interceptors.request.use((config) => {
  const token = Cookies.get('access_token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      setLoading(true);
      setIsAuthenticated(true);
      getUser();
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const register = useCallback(
    async (
      username: string,
      email: string,
      password: string,
      confirm_password: string
    ) => {
      try {
        const encryptedPassword = encryptPassword(password);
        const encryptedConfirmPassword = encryptPassword(confirm_password);

        const response = await authAxios.post('/register', {
          username,
          email,
          password: encryptedPassword,
          confirm_password: encryptedConfirmPassword,
        });

        console.log('Registration successful:', response.data);

        if (response.status !== 200) {
          throw new Error(
            `Failed to register: ${response.data.message || 'Unknown error'}`
          );
        }
      } catch (error) {
        console.error('Failed to register:', error);
        throw error;
      }
    },
    []
  );

  const login = useCallback(async (username: string, password: string) => {
    const encryptedPassword = encryptPassword(password);

    try {
      const response = await authAxios.post('/login', {
        username,
        password: encryptedPassword,
      });

      const { access_token } = response.data;

      Cookies.set('access_token', access_token, {
        expires: 7,
        secure: true,
        sameSite: 'Strict',
      });
      await getUser();
      console.log('Login successful:', response.data);

      console.log(access_token);

      console.log('Login successful, token stored');
    } catch (error) {
      console.error('Failed to login:', error);
      throw error;
    }
  }, []);

  const getUser = useCallback(async () => {
    try {
      const response = await authAxios.get('/user/profile');
      setUser(response.data);
      setIsAuthenticated(true);
      console.log('User fetched successfully:', response.data);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  }, []);

  const updateUser = useCallback(async (UserData: Partial<User>) => {
    console.log(UserData);
    try {
      const response = await authAxios.patch('/user/update', {
        first_name: UserData.first_name,
        middle_name: UserData.middle_name,
        last_name: UserData.last_name,
        phone_number: UserData.phone_number,
        credit_card: UserData.credit_card,
      });
      setUser(response.data);
      console.log('User updated successfully:', response.data);
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  }, []);

  const changePassword = useCallback(
    async (
      currentPassword: string,
      newPassword: string,
      confirmNewPassword: string
    ) => {
      try {
        const encryptedCurrentPassword = encryptPassword(currentPassword);
        const encryptedNewPassword = encryptPassword(newPassword);
        const encryptedConfirmNewPassword = encryptPassword(confirmNewPassword);

        const response = await authAxios.patch('/user/change-password', {
          old_password: encryptedCurrentPassword,
          new_password: encryptedNewPassword,
          confirm_password: encryptedConfirmNewPassword,
        });

        if (response.status !== 200) {
          throw new Error(
            `Failed to change password: ${
              response.data.message || 'Unknown error'
            }`
          );
        }

        console.log('Password changed successfully:', response.data);
      } catch (error) {
        console.error('Failed to change password:', error);
        throw error;
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await authAxios.post('/logout');
      Cookies.remove('access_token');
      setUser(null);
      setIsAuthenticated(false);
      console.log('Logout successful');
    } catch (error) {
      console.error('Failed to logout:', error);
      throw error;
    }
  }, []);

  const value = {
    isAuthenticated,
    user,
    loading,
    register,
    login,
    updateUser,
    changePassword,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
