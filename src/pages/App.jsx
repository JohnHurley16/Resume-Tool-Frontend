import React from 'react';

import '../styles/App.styles.css';
import MiniDrawer from '../components/MiniDrawer.components'

function App() {
  const [selected, setSelected] = React.useState();

  return (
    <div className="App">
      <MiniDrawer selected={selected} setSelected={setSelected}>
        <h1>{selected}</h1>
      </MiniDrawer>
    </div>
  );
}

export default App;
