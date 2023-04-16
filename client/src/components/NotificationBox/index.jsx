import React from 'react';
import { Alert } from 'react-bootstrap';

const NotificationBox = ({ message }) => {
  return (
    <Alert variant="success">
      {message}
    </Alert>
  );
};

export default NotificationBox;