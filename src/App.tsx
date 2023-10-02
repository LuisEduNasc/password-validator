import React from 'react';
import PasswordValidator from './components/password-validator';

function App() {
  const handleChange = (validation: boolean) => {
    console.log("🚀 ~ file: App.tsx:6 ~ handleChange ~ validation:", validation)
  };

  return (
    <div className="App">
      <PasswordValidator
        passwordReqs={['number', 'specialCharacters', 'uppercase', 'noConsecutiveLetters']}
        disabled={false}
        onChange={handleChange}
      />
    </div>
  );
}

export default App;
