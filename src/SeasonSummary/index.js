import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
// import AvatarGroup from '@material-ui/core/AvatarGroup';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';

import {totalPointsForPosition, sum} from '../util';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(8),
        marginLeft: theme.spacing(3),
        width: '97%',
        overflowX: 'auto',
        marginBottom: theme.spacing(3)
    },
    table: {
        minWidth: 650,
    },
    heading: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
    smallAvatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    selectedRow: {
        background: "#8F78AD"
    }

}));

const seasonTotalPtsForPosition = (teamData, position) => {
    return teamData.schedule
        .map(wk => totalPointsForPosition(wk.roster.players, position))
        .reduce((total, curr) => total + curr);
};

const seasonTotalPtsStartBench = (teamData, starter = true) => {
    return teamData.schedule
        .map(wk => sum(wk.roster
            .players
            .filter(plyr => plyr.starter == starter),
            "points")
        )
        .reduce((total, curr) => total + curr);
};

const columns = ["QB", "RB", "WR", "TE", "D/ST", "Total", "Bench"];

const sorters = columns.map(col => {
    switch (col) {
        case "Total":
            return {
                sortBy: col,
                sorter: (a, b) => {
                    return seasonTotalPtsStartBench(b) - seasonTotalPtsStartBench(a);
                }
            }
        case "Bench":
            return {
                sortBy: col,
                sorter: (a, b) => {
                    return seasonTotalPtsStartBench(b, false) - seasonTotalPtsStartBench(a, false);
                }
            }
        default:
            return {
                sortBy: col,
                sorter: (a, b) => {
                    return seasonTotalPtsForPosition(b, col) - seasonTotalPtsForPosition(a, col);
                }
            }
    }
});

function DisplayPointsByPositionTable(props) {
    const classes = useStyles();
    const [teamStats, setTeamStats] = useState([]);
    const [activeSorter, setActiveSorter] = useState("Total");
    const [selectedRow, setSelectedRow] = useState(-1);

    useEffect(() => {
        // fetch(`${process.env.REACT_APP_BASE_URL}/leagues/${props.leagueId}/teams/season-stats`)
        fetch(`https://8fqfwnzfyb.execute-api.us-east-1.amazonaws.com/dev/leagues/${props.leagueId}/teams/season-stats`)
            .then(response => {
                console.log(response);
                return response.json()
            })
            .then(data => {
                console.log(data);
                setTeamStats(data); // set users in state
            });
    }, [props.leagueId]);

    return (
        <Paper className={classes.root}>
            <Typography className={classes.heading} variant="h6">Total Points x Position</Typography>
            {/* <AvatarGroup>
                {teamData.map(team => {
                    return (
                        <Avatar></Avatar>
                    )
                })}
            </AvatarGroup> */}
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Team</TableCell>
                        {
                            columns.map(col => {
                                return (
                                    <TableCell key={col}>
                                        <Tooltip
                                            title="Sort"
                                            placement="bottom-start"
                                            enterDelay={300}
                                        >
                                            <TableSortLabel
                                                active={activeSorter === col}
                                                direction='desc'
                                                onClick={() => setActiveSorter(col)}
                                            >
                                                {col}
                                            </TableSortLabel>
                                        </Tooltip>
                                    </TableCell>
                                )
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {teamStats.sort(sorters.find(srtr => srtr.sortBy === activeSorter).sorter).map(team => {
                        return (
                            // <TableRow key={team.id} className={team.id === selectedRow ? classes.selectedRow : null}>
                            <TableRow key={team.id} hover={true} selected={team.id === selectedRow} onClick={() => setSelectedRow(team.id)}>
                                <TableCell>
                                    <Avatar src={team.logo} className={classes.smallAvatar} />
                                  </TableCell>
                                <TableCell className={classes.tableCell} onClick={() => setSelectedRow(team.id)}>
                                    {team.location + " " + team.nickname}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                    {Math.round(seasonTotalPtsForPosition(team, "QB") * 10) / 10}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                {Math.round(team.schedule.map(wk => totalPointsForPosition(wk.roster.players, "RB")).reduce((total, curr) => total + curr) * 10) / 10}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                {Math.round(team.schedule.map(wk => totalPointsForPosition(wk.roster.players, "WR")).reduce((total, curr) => total + curr) * 10) / 10}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                {Math.round(team.schedule.map(wk => totalPointsForPosition(wk.roster.players, "TE")).reduce((total, curr) => total + curr) * 10) / 10}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                {Math.round(team.schedule.map(wk => totalPointsForPosition(wk.roster.players, "D/ST")).reduce((total, curr) => total + curr) * 10) / 10}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                    {Math.round(team.schedule.map(wk => sum(wk.roster.players.filter(plyr => plyr.starter === true), "points")).reduce((total, curr) => total + curr)  * 10) / 10}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                    {Math.round(team.schedule.map(wk => sum(wk.roster.players.filter(plyr => plyr.starter === false), "points")).reduce((total, curr) => total + curr)  * 10) / 10}
                                </TableCell>
                            </TableRow>
                        )
                    }
                    )}
                </TableBody>
            </Table>
        </Paper>
    );
};


export default DisplayPointsByPositionTable;