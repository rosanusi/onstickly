import React from 'react';
import moment from 'moment';
import NewBoardForm from './NewBoardForm';


function SessionBlocks(props) {

    let sessionId = props.match.params.sessionId   
    let {activeUserSessions} = props
    let filteredSession = activeUserSessions.filter(session => session.id === sessionId);
    let clickedSession = filteredSession[0];
    let clickedSessionBoards = clickedSession.boards;
    let formattedSessionBoards = Object.entries(clickedSessionBoards).map(e => Object.assign(e[1], { key: e[0] }));

    let boardList;
    if(clickedSessionBoards){
        boardList = formattedSessionBoards.map((board, index) =>
            <li 
                className="session-block"
                key={board.id}
            >
                <h3 className="title">{board.title}</h3>
                <small className="stickies-num">15 stickies</small>
            </li>
        );
    }


    let dateCreated = () => {
        let date = moment(clickedSession.dateCreated).format('LL'); 
        return date
    }

    console.log(clickedSession)


    return (
        <>
            <div className="main-list-container">
                <div className="main-list_header">
                    <div className="title-block">
                        <h1 className="title">{clickedSession.title}</h1>
                        <small>{dateCreated()}</small>
                    </div>
                    <button 
                        type="button" 
                        className="createBtn"
                        onClick={props.newBoardModal}
                    >
                        New Board
                    </button>
                </div>
                <ul className="block-container">
                    {boardList}
                </ul>
            </div>
            { props.newBoardForm && 
                < NewBoardForm
                    addNewBoard={props.addNewBoard.bind(sessionId)}
                    handleChange = {props.handleChange}
                    sessionId = {clickedSession.id}
                />
            } 
        </>
    );
}

export default SessionBlocks;