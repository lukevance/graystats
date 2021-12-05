import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

import {
    totalPointsForPosition, 
    startersForPosition,
    seasonTotalPtsForPosition,
    sum
} from '../util';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(8),
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        maxWidth: '97%',
        overflowX: 'auto',
        marginBottom: theme.spacing(3)
    },
}));

const seasonAllStartersForPosition = (teamData, position) => {
    const playerWeeks = teamData.schedule
        .map(wk => startersForPosition(wk.roster.players, position))
        .flat();
    const unique = [...new Set(playerWeeks.map(item => item.name))];
    const uniquePlayerTotals = unique.map(plyr => {
        return {
            name: plyr,
            starts: playerWeeks.filter(wk => wk.name === plyr).length,
            points: playerWeeks.filter(wk => wk.name === plyr).map(wk => wk.points).reduce((total, curr) => total + curr),
        }
    });
    return uniquePlayerTotals;
};

function PositionTableCell(props){
    const classes = useStyles();
    return (
        <TableCell className={classes.tableCell} onClick={() => console.log(seasonAllStartersForPosition(props.team, props.position))}>
            {Math.round(seasonTotalPtsForPosition(props.team, props.position) * 10) / 10}
        </TableCell>
    )
};

export default PositionTableCell;
