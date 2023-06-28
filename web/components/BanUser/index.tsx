import React, { useState, ChangeEvent } from 'react';

const BanUserComponent: React.FC = () => {
  const [userId, setUserId] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const handleBanUser = () => {
    console.log(`Banindo usuário com ID ${userId}`);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        value={userId}
        onChange={handleInputChange}
        style={{ marginRight: '10px' }}
      />
      <button onClick={handleBanUser} style={{ padding: '5px 10px', backgroundColor: '#f00', color: '#fff' }}>
        Banir
      </button>
    </div>
  );
};

export default BanUserComponent;
