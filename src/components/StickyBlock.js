import React, { useEffect, useState } from 'react';
import firebase from './../config/firebase'
import moment from 'moment';
// import NewBoardForm from './NewBoardForm';


function StickyBlock(props) {

    let {boardId} = props.match.params
    let {sessionKey} = props.match.params

    console.log(sessionKey)
    let [board, setBoard] = useState({})
    // let [sessionBoards, setSessionBoards] = useState({})
    let [loading, setLoading] = useState(true)
   
    console.log(props)



    useEffect(() => {
        // Create an scoped async function in the hook
        async function loadBoardStickies() {
          await getBoardStickies();

        }
        // Execute the created function directly
        loadBoardStickies();
    }, []);


    let getBoardStickies = async () => {

        // console.log(props)
        // console.log(boardKey)

        let ref = firebase.database().ref(`sessionsData/${sessionKey}/boards`).orderByChild("id").equalTo(boardId);

        let board;
        await ref.once('child_added', function(snapshot) {
            board = snapshot.val();
        }, (error) => {
            console.log(error);
        });

        setBoard(board)

    //     let sessionBoards = session.boards
    //     let formattedSessionBoards;
    //     if(session.boards){
    //         formattedSessionBoards = Object.entries(sessionBoards).map(e => Object.assign(e[1], { key: e[0] }));
    //     }

    //     setSessionBoards(formattedSessionBoards)

        setLoading(false)
        console.log(board)


    }






    // let sessionId = props.match.params.sessionId   
    // let {activeUserSessions} = props
    // let filteredSession = activeUserSessions.filter(session => session.id === sessionId);
    // let clickedSession = filteredSession[0];
    // let clickedSessionBoards = clickedSession.boards;
    // let formattedSessionBoards = Object.entries(clickedSessionBoards).map(e => Object.assign(e[1], { key: e[0] }));

    // let boardList;
    // if(clickedSessionBoards){
    //     boardList = formattedSessionBoards.map((board, index) =>
    //         <li 
    //             className="session-block"
    //             key={board.id}
    //         >
    //             <h3 className="title">{board.title}</h3>
    //             <small className="stickies-num">15 stickies</small>
    //         </li>
    //     );
    // }


    let dateCreated = () => {
        let date = moment(board.dateCreated).format('LL'); 
        return date
    }

    // console.log(clickedSession)


    return (
        <>
            <div className="main-list-container">
                <div className="main-list_header">
                    <div className="title-block">
                        <h1 className="title">{board.title}</h1>
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
                {/* <ul className="block-container">
                    {boardList}
                </ul> */}
            </div>
            {/* { props.newBoardForm && 
                < NewBoardForm
                    addNewBoard={props.addNewBoard.bind(sessionId)}
                    handleChange = {props.handleChange}
                    sessionId = {clickedSession.id}
                />
            }  */}
        </>
    );
}

export default StickyBlock;