import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import NavBar from './NavBar';
import PointsByPositionTable from './PointsByPositionTable/index';

function App() {
  return (
    <div className="App">
      <NavBar />
      <PointsByPositionTable leagueId="286565"/>
    </div>
  );
}

export default App;
