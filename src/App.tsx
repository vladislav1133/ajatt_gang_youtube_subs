import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';

import {DriveFolders} from './components/DriveFolders';

function App() {
  return (
    <div className="App bg-dark text-light min-vh-100 p-4">
      <DriveFolders/>
    </div>
  );
}

export default App;
