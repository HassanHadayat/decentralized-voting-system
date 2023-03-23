import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import "./NotificationsPage.css"

function NotifiationsPage() {
  const [position, setPosition] = useState('top-start');

  return (
    <>
    <h2>Notifications</h2>
    <ToastContainer>
      <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Election Update</strong>
          <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body className='khabar'>Upcoming Elections in 10 days</Toast.Body>
      </Toast>
      
      <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Election Update</strong>
          <small className="text-muted">2 seconds ago</small>
        </Toast.Header>
        <Toast.Body className='khabar'>PTI most likely to win upcoming elections</Toast.Body>
      </Toast>
 
      <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Life Update</strong>
          <small className="text-muted">3 minutes ago</small>
        </Toast.Header>
        <Toast.Body className='khabar'>You have won a mercedes S Class</Toast.Body>
      </Toast>
 
      <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Ultimate Update</strong>
          <small className="text-muted">1 hour ago</small>
        </Toast.Header>
        <Toast.Body className='khabar'>Saitama beats Goku</Toast.Body>
      </Toast>
      <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Ultimate Update</strong>
          <small className="text-muted">1 hour ago</small>
        </Toast.Header>
        <Toast.Body className='khabar'>Saitama beats Goku</Toast.Body>
      </Toast>
    </ToastContainer>
    </>
  );
}

export default NotifiationsPage;