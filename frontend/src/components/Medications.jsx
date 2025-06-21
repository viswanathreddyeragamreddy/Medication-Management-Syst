import LogoutButton from './LogoutButton';
import { useMedications, useAddMedication, useMarkMedication } from '../hooks/useMedications';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required(),
  dosage: yup.string().required(),
  frequency: yup.string().required()
});

const Medications = () => {
  const { data, isLoading } = useMedications();
  const addMedication = useAddMedication();
  const markMedication = useMarkMedication();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (form) => {
    addMedication.mutate(form, { onSuccess: () => reset() });
  };

  if (isLoading) return <p>Loading medications...</p>;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Name" {...register('name')} />
        <p>{errors.name?.message}</p>
        <input placeholder="Dosage" {...register('dosage')} />
        <p>{errors.dosage?.message}</p>
        <input placeholder="Frequency" {...register('frequency')} />
        <p>{errors.frequency?.message}</p>
        <button type="submit">Add Medication</button>
      </form>
      <ul>
        {data.map((med) => (
          <li key={med.id}>
            {med.name} - {med.dosage} ({med.frequency})
            <button onClick={() => markMedication.mutate(med.id)}>Mark as Taken</button>
          </li>
        ))}
      </ul>
      <LogoutButton />
    </div>
  );
};

export default Medications;
