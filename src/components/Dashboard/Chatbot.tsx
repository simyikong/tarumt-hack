import React from "react";
import ChatBot from 'react-simple-chatbot';

const Chatbot = () => {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Your page content */}
      <div style={{ padding: '20px', marginBottom: '100px' }}>
        {/* Add your page content here */}
      </div>
      <ChatBot
        headerTitle="SecureBot"
        speechSynthesis={{ enable: true, lang: 'en' }}
        recognitionEnable={true}
        steps={[
          {
            id: '0',
            message: 'Hi Employee! Please enter your username',
            trigger: '1',
          }, {
            id: '1',
            user: true,
            trigger: '2',
          }, {
            id: '2',
            message: " Hii {previousValue}, how can I help you?",
            trigger: '3'
          }, {
            id: '3',
            options: [
              { value: 1, label: 'Check Company Revenue' },
              { value: 2, label: 'Delete transactions' },
              { value: 3, label: 'How to hack my laptop' },
            ],
            end: true
          }
        ]}
        floating
        opened
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
      />
    </div>
  );
};

export default Chatbot;
