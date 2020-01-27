import React from 'react';

function MainBoard(props) {


        let user = props.userData;
        let sessions = props.activeUserSessions;

        const MainList = sessions.map((session, index) =>
            <li 
                className="session-block"
                key={session.id}>
                <h3 className="title">{session.title}</h3>
                <span className="num_board">{ session.boards ? session.boards.length : '0 board' }</span>
            </li>
        );


        return (
            <div className="main-list-container">
                <div className="main-list_header">
                    <h1 className="title">{user.displayName}'s Library</h1>
                    <button 
                        type="button" 
                        className="createBtn"
                        onClick={props.newBoardModal}
                    >
                        New session
                    </button>
                </div>
                <ul className="main-list">
                    {MainList}
                </ul>
            </div>
        );
    // }
}

export default MainBoard;