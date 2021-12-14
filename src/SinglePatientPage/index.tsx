import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';

const SinglePatientPage = () => {
  const [{currentPatient}, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const getSinglePatientData = async () => {
    try {
      const { data: singlePatientData } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch({ type: 'SHOW_CURRENT_PATIENT', payload: singlePatientData });
    } catch (e) {
      console.error(e);
    }
  };

  if (!currentPatient || !(currentPatient.id === id)) {
    void getSinglePatientData();

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
      </div>
    );
  } else {
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
        <p>ssn: {currentPatient.ssn}</p>
        <p>occupation: {currentPatient.occupation}</p>
      </div>
    );
  }
};

export default SinglePatientPage;