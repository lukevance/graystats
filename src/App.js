import React from 'react';
import {BrowserRouter as Router } from "react-router-dom";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';

import NavBar from './NavBar';
import WeeklyScoresTable from './WeeklyScores/index';
import SeasonSummary from './SeasonSummary/index';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#774AAD',
    },
    secondary: {
      main: '#774AAD',
    },
    lightPurple: {
      main: '#B391DC'
    }
  },
});

function App() {
  return (
    <Router>
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <NavBar />
          <WeeklyScoresTable leagueId="286565"/> 
          <SeasonSummary leagueId="286565"/>
        </MuiThemeProvider>
      </div>
    </Router>
  );
}

export default App;
