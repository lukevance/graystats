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

function WeeklyScoresTable(props) {
    const [weekSummaries, setWeekSummaries] = useState([]);

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
            });
    }, [props.leagueId]);

    const columns = ["Week", "Team", "Score", "Rank", "Outcome"];
    console.log(weekSummaries);
    return (
        <Paper>
            <Table>
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
                        const winners = week.matchups.map(matchup => {
                            console.log(matchup.winner);
                            return matchup[matchup.winner.toLowerCase()]
                        });
                        const highScore = winners.sort((a, b) => (a.totalPoints > b.totalPoints) ? -1 : 1)[0];
                        console.log(winners);
                        return (
                            <TableRow key={week.matchupPeriodId}>
                                <TableCell>{week.matchupPeriodId}</TableCell>
                                {/* TODO: add func for finding week high score */}
                                <TableCell>{highScore.teamId}</TableCell>
                                <TableCell>{highScore.totalPoints}</TableCell>
                            </TableRow>
                        );
                    }): null}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default WeeklyScoresTable;