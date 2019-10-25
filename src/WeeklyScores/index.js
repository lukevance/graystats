import React, { useState, useEffect } from 'react';

import WeeklySummaries from './Weeks';
import Leaderboard from './Leaderboard';

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

function WeeklyScoresTable(props) {
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
        <div>
            <Leaderboard 
                weekSummaries={weekSummaries} 
                teamNameFromId={teamNameFromId}
                teams={teams}
            />
            <WeeklySummaries 
                weekSummaries={weekSummaries} 
                teamNameFromId={teamNameFromId}
                teams={teams}
            />
        </div>
    );
};

export default WeeklyScoresTable;