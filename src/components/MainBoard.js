import React from 'react';
import {Link } from "react-router-dom";

function MainBoard(props) {


        console.log(props)

        let user = props.userData;
        let sessions = props.activeUserSessions;

        let sessionBoardsLenght = (array) => {
            let formattedArray = Object.entries(array).map(e => Object.assign(e[1], { key: e[0] }));
            if(formattedArray.length > 1){
                return formattedArray.length + ' boards'
            }else{
                return formattedArray.length + ' board'
            }
        }


        const MainList = sessions.map((session, index) =>
            <li
                className="session-block"
                key={session.id}
                // onClick={props.showSessionBlocks.bind(this, session.id)} 
            >
                <Link to={`/${session.id}`}>
                    <div className="title">                        
                        <span>{session.title}</span>wddssd
                        <span className="num_board">{ session.boards ? sessionBoardsLenght(session.boards) : '0 board' }</span>
                    </div>
                </Link>
            </li>
        );


        return (

            <>
                <div className="main-list-container">
                    <div className="main-list_header">
                        <h1 className="title">{user.displayName}'s Library</h1>
                        <button 
                            type="button" 
                            className="createBtn"
                            onClick={props.newSessionModal}
                        >
                            New session
                        </button>
                    </div>

                    <ul className="main-list">
                        {MainList}
                    </ul>
                </div>
            </>

        );

}

export default MainBoard;