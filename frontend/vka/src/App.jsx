import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import AddClient from './AddClient/AddClient';
import ViewClient from './ViewClients/ViewClient';
import Login from './login/Login';
import ProtectRoutes from './auth/ProtectRoutes';

// Prime react css

import "primereact/resources/themes/bootstrap4-dark-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons
import Statistics from './statistics/Statistics';


function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectRoutes/>}>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddClient />} />
          <Route path="/view" element={<ViewClient />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="*" element={<Home/>}/>
        </Route>
          
      </Routes>
    </Router>
  );
}

export default App;
