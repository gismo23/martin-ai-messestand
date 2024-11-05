import React from 'react'
import ReactDOM from 'react-dom/client'
import MessestandViewer from './MessestandViewer'

// Debug-Ausgaben
console.log('main.jsx wird ausgeführt');
console.log('Root-Element:', document.getElementById('root'));

try {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <div style={{ padding: '20px', color: 'white' }}>
      <h1>React funktioniert!</h1>
      <div className="test-box"></div>
    </div>
  );
  console.log('React-Rendering erfolgreich');
} catch (error) {
  console.error('Fehler beim React-Rendering:', error);
  // Fallback-Anzeige bei Fehler
  document.getElementById('root').innerHTML = `
    <div style="color: white; padding: 20px;">
      Fehler beim Laden von React: ${error.message}
    </div>
  `;
}
