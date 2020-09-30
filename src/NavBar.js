import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';

import FootballIcon from '@material-ui/icons/SportsFootball';

// import MenuDrawer from './components/MenuDrawer';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxHeight: theme.spacing(4),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'white'
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
  },
}));

function ButtonAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuDrawer />
          </IconButton> */}
          <FootballIcon />
          <Hidden xsDown>
            <Typography variant="h6" className={classes.title}>
              Fantasy Football Statbook
            </Typography>
            <Button 
              color="inherit"
              onClick={event => setAnchorEl(event.currentTarget)}
            >
              League of Ordinary Working Men
            </Button>
          </Hidden>
          <Hidden smUp>
            <Typography variant="h6" className={classes.title}>
              Statbook
            </Typography>
            <Button 
              color="inherit"
              onClick={event => setAnchorEl(event.currentTarget)}
            >
              LOWM
            </Button>
          </Hidden>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem
              onClick={() => setAnchorEl(null)}
            >
              League of Ordinary Working Men
            </MenuItem>
            <MenuItem
              component="a"
              href="https://docs.google.com/forms/d/e/1FAIpQLSeO4lBWd47wCAnrX2zidEab0lZ05ZC6Gx9qPb1jssghQqteXQ/viewform"
              target="_blank"
            >
              Get a Statbook for your league!
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withWidth()(ButtonAppBar);