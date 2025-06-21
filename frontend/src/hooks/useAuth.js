import { useMutation } from '@tanstack/react-query';
import API from '../api/axios';

export const useLogin = () => useMutation((data) => API.post('/auth/login', data));
export const useSignup = () => useMutation((data) => API.post('/auth/signup', data));
