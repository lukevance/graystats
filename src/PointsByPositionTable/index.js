import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import DisplayPointsByPositionTable from './Display.PtsByPosTable';

const useStyles = makeStyles(theme => ({
    menuButton: {
        float: 'right',
        margin: theme.spacing(2),
    }
}));

function PointsByPositionTable(props) {
    const classes = useStyles();
    // TODO: useEffects to detect what currentNFLWeek should be
    const [currentNFLWeek, setCurrNFLWeek] = useState(7);
    const [selectedWeek, setSelectedWeek] = useState(currentNFLWeek);
    const [menuAnchor, setMenuAnchor] = useState(null);

    const validWeeks = Array.from(new Array(currentNFLWeek), (x,i) => i + 1).reverse();

    return (
        <div>
            <Button
                aria-owns={menuAnchor ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={(event) => setMenuAnchor(event.currentTarget)}
                className={classes.menuButton}
            >
                {`Week ${selectedWeek}`}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={()=> setMenuAnchor(null)}
            >
                {validWeeks.map(week => {
                    return (
                        <MenuItem
                            key={week}
                            onClick={() => {
                                setSelectedWeek(week);
                                setMenuAnchor(null);
                            }}
                        >
                            {`Week ${week}`}
                        </MenuItem>
                    )
                })}
            </Menu>
            <DisplayPointsByPositionTable week={selectedWeek} leagueId={props.leagueId} />
        </div>
    )
}

export default PointsByPositionTable;