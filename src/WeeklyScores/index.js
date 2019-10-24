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

function WeeklyScoresTable(props) {
    const [weekSummaries, setWeekSummaries] = useState([]);

    const columns = ["Week", "Team", "Score", "Rank", "Outcome"];
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
                    {weekSummaries.map(week => {
                        return (
                            <TableRow>
                                <TableCell>{week.matchupPeriodId}</TableCell>
                                {/* TODO: add func for finding week high score */}
                                <TableCell>{week.winner.toLowerCase()}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    )
}

export default WeeklyScoresTable;