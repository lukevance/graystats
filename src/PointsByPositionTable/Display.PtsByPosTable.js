import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';

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
}));

const columns = ["QB", "RB", "WR", "TE", "D/ST", "Total", "Bench"];

const sum = (items, prop) => {
    return items.reduce((a, b) => {
        return a + b[prop];
    }, 0);
};

const totalPointsForPosition = (players, position) => {
    const positionPlayers = players.filter(plyr => plyr.position === position && plyr.starter === true);
    const totalPoints = Math.round(sum(positionPlayers, "points") * 10) / 10;
    return totalPoints;
};

const sorters = columns.map(col => {
    switch (col) {
        case "Total":
            return {
                sortBy: col,
                sorter: (a, b) => {
                    return sum(b.schedule[0].roster.players.filter(plyr => plyr.starter === true), "points") - sum(a.schedule[0].roster.players.filter(plyr => plyr.starter === true), "points");
                }
            }
        case "Bench":
            return {
                sortBy: col,
                sorter: (a, b) => {
                    return sum(b.schedule[0].roster.players.filter(plyr => plyr.starter === false), "points") - sum(a.schedule[0].roster.players.filter(plyr => plyr.starter === false), "points");
                }
            }
        default:
            return {
                sortBy: col,
                sorter: (a, b) => {
                    return totalPointsForPosition(b.schedule[0].roster.players, col) - totalPointsForPosition(a.schedule[0].roster.players, col);
                }
            }
    }
});

function DisplayPointsByPositionTable(props) {
    const classes = useStyles();
    const [teamStats, setTeamStats] = useState([]);
    const [activeSorter, setActiveSorter] = useState("Total");

    useEffect(() => {
        const weekParam = props.week ? `?week=${props.week}` : ``;
        fetch(`https://8fqfwnzfyb.execute-api.us-east-1.amazonaws.com/dev/leagues/${props.leagueId}/teams/stats${weekParam}`)
            .then(response => response.json())
            .then(data => {
                setTeamStats(data); // set users in state
            });
    }, [props.week]);

    return (
        <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
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
                            <TableRow key={team.id}>
                                <TableCell className={classes.tableCell}>
                                    {team.location + " " + team.nickname}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                    {totalPointsForPosition(team.schedule[0].roster.players, "QB")}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                    {totalPointsForPosition(team.schedule[0].roster.players, "RB")}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                    {totalPointsForPosition(team.schedule[0].roster.players, "WR")}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                    {totalPointsForPosition(team.schedule[0].roster.players, "TE")}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                    {totalPointsForPosition(team.schedule[0].roster.players, "D/ST")}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                    {Math.round(sum(team.schedule[0].roster.players.filter(plyr => plyr.starter === true), "points") * 10) / 10}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                    {Math.round(sum(team.schedule[0].roster.players.filter(plyr => plyr.starter === false), "points") * 10) / 10}
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