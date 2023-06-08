import React from 'react';
import { Alert } from 'react-bootstrap';

const NotificationBox = ({ message, variant="success" }) => {
  return (
    <Alert variant={variant}>
      {message}
    </Alert>
  );
};

export default NotificationBox;