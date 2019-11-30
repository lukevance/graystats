import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(8),
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(3),
        width: '97%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    heading: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
    }
}));

const columns = ["Team", "High Score Finishes", "Highest", "Low Score Finishes", "Lowest"];

function DisplayWeeklyScoresLeaderBoard (props) {
    const classes = useStyles();
    const {weekSummaries, teams, teamNameFromId} = props;
    console.log(weekSummaries);
    const teamsWithHighLows = teams.map(team => {
        let teamPlus = team;
        teamPlus.highScores = 
    })
    
    return (
        <Paper className={classes.root}>
            <Typography className={classes.heading} variant="h6">Leaderboard</Typography>
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
                    {teams.map(team => {
                        const highScores = weekSummaries.filter(wk => wk.highScore)
                        return (
                            <TableRow key={team.id}>
                                <TableCell>{teamNameFromId(team.id, teams)}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default DisplayWeeklyScoresLeaderBoard;