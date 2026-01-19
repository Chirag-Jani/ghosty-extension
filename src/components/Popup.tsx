import { useState } from 'react';

function Popup() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    console.log('Open button clicked');
    setIsOpen(true);
    // Add your open functionality here
  };

  const handleClose = () => {
    console.log('Close button clicked');
    setIsOpen(false);
    // Add your close functionality here
  };

  return (
    <div style={{ padding: '20px', minWidth: '300px' }}>
      <h1>Popup</h1>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button onClick={handleOpen}>Open</button>
        <button onClick={handleClose}>Close</button>
      </div>
      {isOpen && (
        <p style={{ marginTop: '10px', color: 'green' }}>Opened!</p>
      )}
    </div>
  );
}

export default Popup;
