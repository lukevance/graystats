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

module.exports.seasonTotalPtsForPosition = (teamData, position) => {
    return teamData.schedule
        .map(wk => totalPointsForPosition(wk.roster.players, position))
        .reduce((total, curr) => total + curr);
};

module.exports.startersForPosition = (players, position) => {
    const positionPlayers = players.filter(plyr => plyr.position === position && plyr.starter === true);
    return positionPlayers;
};

module.exports.teamNameFromId = (id, teams) => {
    if (teams.length > 0) {
        const team = teams.find(tm => tm.id == id); // TODO: convert both ids to string or num
        return `${team.location} ${team.nickname}`;
    } else {
        return "";
    }
};

module.exports.sum = sum;
module.exports.totalPointsForPosition = totalPointsForPosition;

module.exports.range = (start, end) => {
    let range = [];
    for (let i = start; i <= end; i++){
        range.push(i);
    }
    return range;
};