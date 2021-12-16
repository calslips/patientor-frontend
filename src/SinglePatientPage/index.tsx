import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon, List } from 'semantic-ui-react';

import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, showSinglePatient } from '../state';

const SinglePatientPage = () => {
  const [{currentPatient}, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

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
        <div key={entry.id}>
          <List>
            <List.Item>{entry.date} <em>{entry.description}</em>
            <List bulleted>
              {entry.diagnosisCodes?.map(code => (
                <List.Item key={code}>{code}</List.Item>
              ))}
            </List>
            </List.Item>
          </List>
        </div>
      ))}
    </div>
  );

};

export default SinglePatientPage;