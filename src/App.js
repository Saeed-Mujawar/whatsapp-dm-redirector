import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MobileNumberForm from './components/MobileNumberForm';
import ChatHistory from './components/ChatHistory';
import 'bootstrap/dist/css/bootstrap.min.css';

const LOCAL_STORAGE_KEY = 'chatHistory';

function App() {
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // Load chat history from local storage on component mount
    const storedHistory = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    setChatHistory(storedHistory);
  }, []);

  const handleAddChat = (phoneNumber) => {
    const newEntry = { id: Date.now(), mobile_number: phoneNumber };
    const updatedHistory = [...chatHistory, newEntry];
    setChatHistory(updatedHistory);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  const handleRemoveChat = (id) => {
    const updatedHistory = chatHistory.filter((item) => item.id !== id);
    setChatHistory(updatedHistory);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h1 className="text-center mt-5">Connect with WhatsApp in a Click!</h1>
          <MobileNumberForm onAddChat={handleAddChat} />
          <ChatHistory chatHistory={chatHistory} onRemoveChat={handleRemoveChat} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
