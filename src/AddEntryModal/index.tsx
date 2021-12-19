import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      <Button onClick={() => onSubmit()}>change</Button>
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;