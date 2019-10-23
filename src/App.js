import React, {useState} from 'react';
import {makeStyles, createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

import NavBar from './NavBar';
import PointsByPositionTable from './PointsByPositionTable/index';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4a148c',
    },
    secondary: {
      main: '#774AAD',
    },
  },
});

const useStyles = makeStyles(theme => ({
  mainNavBtn: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(3),
    textAlign: 'left',
  }
}))

const availableTableViews = [
  {
    title: "League Overview",
    link: "overview"
  },
  {
    title: "Points by Position",
    link: "pts-by-position"
  },
  {
    title: "Weekly Top Scores",
    link: "weekly-scores"
  },
  {
    title: "+ Add New Table",
    link: "add-new"
  }
];

function App() {
  const classes = useStyles();
  const [selectedTable, setSelectedTable] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <NavBar />
        <Button 
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
                  >
                    {view.title}
                  </MenuItem>
                )
              })
            }
          </Menu>
        <PointsByPositionTable leagueId="286565"/>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
