import React from 'react';
import PasswordValidator from './components/password-validator';

function App() {
  return (
    <div className="App">
      <PasswordValidator
        passwordReqs={['number', 'specialCharacters', 'uppercase', 'noConsecutiveLetters']}
        disabled={false}
      />
    </div>
  );
}

export default App;
