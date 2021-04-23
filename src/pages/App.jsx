import React from 'react';

import '../styles/App.styles.css';
import MiniDrawer from '../components/MiniDrawer'

function App() {
  const [selected, setSelected] = React.useState();

  return (
    <div className="App">
      <MiniDrawer selected={selected} setSelected={setSelected}>
      </MiniDrawer>
    </div>
  );
}

export default App;
