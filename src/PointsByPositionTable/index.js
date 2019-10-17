import React, { useState, useEffect } from 'react';

import DisplayPointsByPositionTable from './Display.PtsByPosTable';

function PointsByPositionTable(props){
    return(
        <DisplayPointsByPositionTable week={4} leagueId={props.leagueId}/>
    )
}

export default PointsByPositionTable;