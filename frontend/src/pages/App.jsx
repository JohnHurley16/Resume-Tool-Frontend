import React from 'react';

import { useAuth } from '../contexts/AuthContext'

import '../styles/App.styles.css';
import MiniDrawer from '../components/MiniDrawer.components'
import MuiModal from '../components/MuiModal.components'
import CustomizedMenus from '../components/ProfileDropdown.component'

function App() {
  const [selected, setSelected] = React.useState();

  const { currentUser } = useAuth();


  return (
    <div className="App">
      <MiniDrawer setSelected={setSelected}>
        {currentUser ? <CustomizedMenus /> : <MuiModal />}
        <h1>{selected}</h1>
      </MiniDrawer>
    </div>
  );
}

export default App;