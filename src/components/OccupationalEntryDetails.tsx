import React from 'react';
import { Icon } from 'semantic-ui-react';

import { OccupationalHealthcareEntry } from '../types';
import { entryStyle } from '../styles';

const OccupationalEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <div style={entryStyle}>
    <h3><strong>{entry.date}</strong> <Icon name='stethoscope'/>
    {entry.employerName && <strong>{entry.employerName}</strong>}</h3>
    <p><em>{entry.description}</em></p>
  </div>
  );
};

export default OccupationalEntryDetails;