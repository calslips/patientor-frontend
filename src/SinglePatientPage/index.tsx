import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon, Button } from 'semantic-ui-react';

import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, showSinglePatient } from '../state';
import EntryDetails from '../components/EntryDetails';
import AddEntryModal from '../AddEntryModal';

const SinglePatientPage = () => {
  const [{currentPatient}, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  const getSinglePatientData = async () => {
    try {
      const { data: singlePatientData } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(showSinglePatient(singlePatientData));
    } catch (e) {
      console.error(e);
    }
  };

  if (!currentPatient || !(currentPatient.id === id)) {
    void getSinglePatientData();
  }

  return (
    <div>
      <h2>
        {currentPatient?.name} {currentPatient?.gender === 'female'
          ? <Icon name='venus' />
          : currentPatient?.gender === 'male'
            ? <Icon name='mars' />
            : <Icon name='genderless' />
        }
      </h2>
      <p>ssn: {currentPatient?.ssn}</p>
      <p>occupation: {currentPatient?.occupation}</p>
      <h3>entries</h3>
      {currentPatient?.entries.map(entry => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={() => openModal()}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );

};

export default SinglePatientPage;