import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
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

const columns = ["Week", "High Score", "Points", "Low Score", "Points"];

function DisplayWeeksHighLows (props) {
    const classes = useStyles();
    const {weekSummaries, teams, teamNameFromId} = props;
    return (
        <Paper className={classes.root}>
            <Typography className={classes.heading} variant="h6">Winners & Losers</Typography>
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
                        // const winners = week.matchups.map(matchup => matchup[matchup.winner.toLowerCase()]);
                        // const highScore = winners.sort((a, b) => (a.totalPoints > b.totalPoints) ? -1 : 1)[0];
                        // const losers = week.matchups.map(matchup => {
                        //     switch (matchup.winner) {
                        //         case "HOME":
                        //             return matchup.away;
                        //         case "AWAY":
                        //             return matchup.home;
                        //         default:
                        //             break;
                        //     };
                        // });
                        // const lowScore = losers.sort((a,b) => (a.totalPoints > b.totalPoints) ? 1 : -1)[0];
                        const highScoreTeam = teams.find(tm => tm.id == week.highScore.teamId);
                        return (
                            <TableRow key={week.matchupPeriodId}>
                                <TableCell>{week.matchupPeriodId}</TableCell>
                                {/* <TableCell>
                                    <Avatar src={highScoreTeam ? highScoreTeam.logo : null} className={classes.smallAvatar} />
                                </TableCell> */}
                                <TableCell>
                                    {teamNameFromId(week.highScore.teamId, teams)}
                                    </TableCell>
                                <TableCell>{week.highScore.totalPoints}</TableCell>
                                <TableCell>{teamNameFromId(week.lowScore.teamId, teams)}</TableCell>
                                <TableCell>{week.lowScore.totalPoints}</TableCell>
                            </TableRow>
                        );
                    }): null}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default DisplayWeeksHighLows;