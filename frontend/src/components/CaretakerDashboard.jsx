import LogoutButton from './LogoutButton';
import { usePatients, usePatientMedications, useMarkPatientMedication } from '../hooks/useMedications';
import { useState } from 'react';

const CaretakerDashboard = () => {
  const { data: patients, isLoading: loadingPatients } = usePatients();
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const { data: medications = [], isLoading: loadingMeds } = usePatientMedications(selectedPatientId);
  const mark = useMarkPatientMedication();

  if (loadingPatients) return <p>Loading patients...</p>;

  return (
    <div>
      <h2>Patients</h2>
      <ul>
        {patients.map((p) => (
          <li key={p.id}>
            <button onClick={() => setSelectedPatientId(p.id)}>{p.name}</button>
          </li>
        ))}
      </ul>

      {selectedPatientId && (
        <div>
          <h3>Medications</h3>
          {loadingMeds ? (
            <p>Loading medications...</p>
          ) : (
            <ul>
              {medications.map((med) => (
                <li key={med.id}>
                  {med.name} - {med.dosage} ({med.frequency})
                  <button onClick={() => mark.mutate({ patientId: selectedPatientId, medicationId: med.id })}>
                    Mark as Taken
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <LogoutButton />
    </div>
  );
};

export default CaretakerDashboard;
