import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSignup } from '../hooks/useAuth';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).required(),
  role: yup.string().oneOf(['patient', 'caretaker']).required()
});

const SignupForm = ({ onSignup }) => {
  const signup = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await signup.mutateAsync(data);
      localStorage.setItem('token', res.data.token);
      const user = JSON.parse(atob(res.data.token.split('.')[1]));
      localStorage.setItem('role', user.role);
      onSignup(user.role);
      window.location.href = user.role === 'patient' ? '/patient' : '/caretaker';
    } catch {
      alert('Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      <p>{errors.email?.message}</p>
      <input {...register('password')} type="password" placeholder="Password" />
      <p>{errors.password?.message}</p>
      <select {...register('role')}>
        <option value="">Select role</option>
        <option value="patient">Patient</option>
        <option value="caretaker">Caretaker</option>
      </select>
      <p>{errors.role?.message}</p>
      <button type="submit">Signup</button>
    </form>
  );
};

export default SignupForm;
