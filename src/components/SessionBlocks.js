import React, { useEffect, useState } from 'react';
import moment from 'moment';
import firebase from './../config/firebase'
import NewBoardForm from './NewBoardForm';
import { Link } from "react-router-dom";


function SessionBlocks(props) {

    let [session, setSession] = useState({})
    let [sessionBoards, setSessionBoards] = useState({})
    let [sessionKey, setSessionKey] = useState('')
    let [loading, setLoading] = useState(true)

    let sessionId = props.match.params.sessionId   
    
    useEffect(() => {
        // Create an scoped async function in the hook
        async function loadSessionAndBoards() {
          await getSession();
        }
        // Execute the created function directly
        loadSessionAndBoards();
    }, []);



    let getSession = async () => {

        let ref = firebase.database().ref("sessionsData").orderByChild("id").equalTo(sessionId);
        
        
        let session;
        let sessionKey;
        await ref.once('child_added', function(snapshot) {
            session = snapshot.val();
            sessionKey = snapshot.key;
        }, (error) => {
            console.log(error);
        });

        setSession(session)
        setSessionKey(sessionKey)

        let sessionBoards = session.boards
        let formattedSessionBoards;
        if(session.boards){
            formattedSessionBoards = Object.entries(sessionBoards).map(e => Object.assign(e[1], { key: e[0] }));
        }

        setSessionBoards(formattedSessionBoards)
        setLoading(false)


    }


    let boardList;
    if(session.boards && !loading ){
        boardList = sessionBoards.map((board, index) =>

            <li 
                className="session-block"
                key={board.id}
            >
                <Link to={`/${sessionKey}/${board.id}`}>
                    <h3 className="title">{board.title}</h3>
                    <small className="stickies-num">15 stickies</small>
                 </Link>
            </li>
        );
    }


    let dateCreated = () => {
        let date = moment(session.dateCreated).format('LL'); 
        return date
    }


    return (
        <>
            <div className="main-list-container">
                <div className="main-list_header">
                    <div className="title-block">
                        <h1 className="title">{session.title}</h1>
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
                    sessionId = {session.id}
                />
            } 
        </>
    );
}

export default SessionBlocks;