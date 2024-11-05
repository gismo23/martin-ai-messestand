import React from 'react';

const MessestandViewer = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: 'white' }}>Martin AI Messestand Test</h1>
      <div className="test-box"></div>
      <button 
        onClick={() => alert('Button funktioniert!')}
        style={{
          padding: '10px',
          fontSize: '16px',
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        Klick mich!
      </button>
    </div>
  );
};

export default MessestandViewer;
