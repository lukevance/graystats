module.exports.totalPointsForPosition = (players, position) => {
    const positionPlayers = players.filter(plyr => plyr.position === position && plyr.starter === true);
    const totalPoints = Math.round(sum(positionPlayers, "points") * 10) / 10;
    return totalPoints;
};

module.exports.sum = (items, prop) => {
    return items.reduce((a, b) => {
        return a + b[prop];
    }, 0);
};