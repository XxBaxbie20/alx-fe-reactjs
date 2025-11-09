import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// Import components
import WelcomeMessage from './components/WelcomeMessage';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';

// Import Context
import UserContext from './UserContext';

function App() {
  const [count, setCount] = useState(0);

  const userData = {
    name: "Alice",
    age: 25,
    bio: "Loves hiking and photography."
  };

  return (
    <UserContext.Provider value={userData}>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      {/* Custom components */}
      <WelcomeMessage />
      <Header />
      <MainContent />
      <Footer />
      <UserProfile /> {/* Context provides the data directly */}
      {/* End of custom components */}

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </UserContext.Provider>
  );
}

export default App;
