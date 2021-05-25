import React from 'react';

import { AuthProvider } from '../contexts/AuthContext'

import '../styles/App.styles.css';
import MiniDrawer from '../components/MiniDrawer.components'

function App() {
  const [selected, setSelected] = React.useState();

  return (
    <AuthProvider>
      <div className="App">
        <MiniDrawer selected={selected} setSelected={setSelected}>
          <h1>{selected}</h1>
        </MiniDrawer>
      </div>
    </AuthProvider>
  );
}

export default App;
