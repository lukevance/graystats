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

const range = (start, end) => {
    let range = [];
    for (let i = start; i <= end; i++){
        range.push(i);
    }
    return range;
};

const teamNameFromId = (id, teams) => {
    if (teams.length > 0) {
        const team = teams.find(tm => tm.id == id);
        return `${team.location} ${team.nickname}`;
    } else {
        return "";
    }
}

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

const columns = ["Week", "High Score", "Points", "Low Score", "Points"];

function WeeklyScoresTable(props) {
    const classes = useStyles();
    const [weekSummaries, setWeekSummaries] = useState([]);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        fetch(`https://8fqfwnzfyb.execute-api.us-east-1.amazonaws.com/dev/leagues/${props.leagueId}`)
            .then(response => response.json())
            .then(data => {
                // pull out active week and ensure it's a number
                const currentWeek = data.status.currentMatchupPeriod * 1;
                // create array of weeks from current week
                const weeksArray = range(1, currentWeek - 1).reverse();
                const weeksData = weeksArray.map(wk => {
                    return {
                        matchupPeriodId: wk,
                        matchups: data.schedule.filter(matchup => matchup.matchupPeriodId == wk)
                    }
                });
                setWeekSummaries(weeksData); // set weekSummaries in state
                setTeams(data.teams);
            });
    }, [props.leagueId]);

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {columns.map(col => {
                            return (
                                <TableCell key={col}>
                                    {col}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {weekSummaries.length > 0 ? weekSummaries.map(week => {
                        const winners = week.matchups.map(matchup => matchup[matchup.winner.toLowerCase()]);
                        const highScore = winners.sort((a, b) => (a.totalPoints > b.totalPoints) ? -1 : 1)[0];
                        const losers = week.matchups.map(matchup => {
                            switch (matchup.winner) {
                                case "HOME":
                                    return matchup.away;
                                case "AWAY":
                                    return matchup.home;
                                default:
                                    break;
                            };
                        });
                        const lowScore = losers.sort((a,b) => (a.totalPoints > b.totalPoints) ? 1 : -1)[0];
                        return (
                            <TableRow key={week.matchupPeriodId}>
                                <TableCell>{week.matchupPeriodId}</TableCell>
                                <TableCell>{teamNameFromId(highScore.teamId, teams)}</TableCell>
                                <TableCell>{highScore.totalPoints}</TableCell>
                                <TableCell>{teamNameFromId(lowScore.teamId, teams)}</TableCell>
                                <TableCell>{lowScore.totalPoints}</TableCell>
                            </TableRow>
                        );
                    }): null}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default WeeklyScoresTable;