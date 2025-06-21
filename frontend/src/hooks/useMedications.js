import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../api/axios';

export const useMedications = () => useQuery(['medications'], async () => {
  const { data } = await API.get('/medications');
  return data;
});

export const useAddMedication = () => {
  const queryClient = useQueryClient();
  return useMutation((newMed) => API.post('/medications', newMed), {
    onSuccess: () => queryClient.invalidateQueries(['medications']),
  });
};

export const useMarkMedication = () => {
  const queryClient = useQueryClient();
  return useMutation((id) => API.post(`/medications/${id}/mark`), {
    onSuccess: () => queryClient.invalidateQueries(['medications']),
  });
};

export const usePatients = () => useQuery(['patients'], async () => {
  const { data } = await API.get('/caretaker/patients');
  return data;
});

export const usePatientMedications = (patientId) => useQuery(['patientMedications', patientId], async () => {
  const { data } = await API.get(`/caretaker/patients/${patientId}/medications`);
  return data;
});

export const useMarkPatientMedication = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ patientId, medicationId }) => API.post(`/caretaker/patients/${patientId}/medications/${medicationId}/mark`),
    {
      onSuccess: (_, { patientId }) => queryClient.invalidateQueries(['patientMedications', patientId]),
    }
  );
};
