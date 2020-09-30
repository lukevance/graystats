import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  // Switch,
  // Route,
  // Link
} from "react-router-dom";
import {makeStyles, createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

import NavBar from './NavBar';
// import PointsByPositionTable from './PointsByPositionTable/index';
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

const useStyles = makeStyles(theme => ({
  mainNavBtn: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(3),
    textAlign: 'left',
  }
}))

// const availableTableViews = [
//   {
//     title: "League Overview",
//     link: "overview",
//     disabled: true
//   },
//   {
//     title: "Season by Position",
//     link: "season-by-position",
//     disabled: false
//   },
//   {
//     title: "Points by Position",
//     link: "points-by-position",
//     disabled: false
//   },
//   {
//     title: "Weekly Top Scores",
//     link: "weekly-scores",
//     disabled: false
//   },
//   {
//     title: "+ Add New Table",
//     link: "add-new",
//     disabled: true
//   }
// ];

function App() {
  // const classes = useStyles();
  // const [selectedTable, setSelectedTable] = useState(2);
  // const [anchorEl, setAnchorEl] = useState(null);
  
  return (
    <Router>
      <div className="App">
      <MuiThemeProvider theme={theme}>
        <NavBar />
        <WeeklyScoresTable leagueId="286565"/> 
        <SeasonSummary leagueId="286565"/>
        {/* <Button 
              className={classes.mainNavBtn}
              variant="contained" 
              color="secondary"
              aria-owns={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true"
              onClick={event => setAnchorEl(event.currentTarget)}
            >
              {availableTableViews[selectedTable].title}
              <ArrowDropDown/>
          </Button>
          <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              {availableTableViews.map((view, i) => {
                return (
                  <MenuItem
                    onClick={() => {
                      setSelectedTable(i);
                      setAnchorEl(null);
                    }}
                    selected={i === selectedTable}
                    disabled={view.disabled}
                    component={Link} to={view.link}
                  >
                    {view.title}
                  </MenuItem>
                )
              })
            }
          </Menu>
          <Switch>
          <Route exact path="/">
              <WeeklyScoresTable leagueId="286565"/> 
            </Route>
            <Route path="/points-by-position">
              <PointsByPositionTable leagueId="286565"/>
            </Route>
            <Route path="/weekly-scores">
              <WeeklyScoresTable leagueId="286565"/>
            </Route>
            <Route path="/season-by-position">
              <SeasonSummary leagueId="286565"/>
            </Route>
          </Switch> */}
      </MuiThemeProvider>
      </div>
    </Router>
  );
}

export default App;
