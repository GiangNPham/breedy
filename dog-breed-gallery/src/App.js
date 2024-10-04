import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Home from './pages/Home';

function App() {
  const [selectedBreedsImg, setSelectedBreedsImg] = useState([]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              selectedBreedsImg={selectedBreedsImg}
              setSelectedBreedsImg={setSelectedBreedsImg}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
