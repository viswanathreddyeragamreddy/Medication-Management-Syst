import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLogin } from '../hooks/useAuth';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).required()
});

const LoginForm = ({ onLogin }) => {
  const login = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await login.mutateAsync(data);
      localStorage.setItem('token', res.data.token);
      const user = JSON.parse(atob(res.data.token.split('.')[1]));
      localStorage.setItem('role', user.role);
      onLogin(user.role);
      window.location.href = user.role === 'patient' ? '/patient' : '/caretaker';
    } catch {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      <p>{errors.email?.message}</p>
      <input {...register('password')} type="password" placeholder="Password" />
      <p>{errors.password?.message}</p>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
