import React, { Component } from 'react';
import Header from './Header'
import MainBoard from './MainBoard'
import NewSessionForm from './NewSessionForm';

import SessionBlocks from './SessionBlocks'
import { Route } from "react-router-dom";

class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            newSessionForm : false,
            newBoardForm : false,
            sessionName : '',
            boardName : '',
            clickedSession: {}
        }

        console.log(props)
        // console.log(this.props.match.url)

    }

    newSessionModal(){
        this.setState({ 
          newSessionForm : true
        }); 
    }

    newBoardModal(e){
        let target = e.target;
        target.focus()

        console.log('whaaaar')

        this.setState({ 
          newBoardForm : true
        }); 
    }

    addNewSession(e){
        this.props.handleAddNewSession(this.state.sessionName)
        this.setState({
            newSessionForm : false
        });
    }

    addNewBoard(sessionId) {
        this.props.handleAddNewBoard(sessionId, this.state.boardName)
        this.setState({
            newBoardForm : false
        });
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        }); 
    }
    

    render(){

        let {newSessionForm } = this.state


        return (
            <>
                <Header 
                    logout={this.props.logout}
                    userData={this.props.activeUser} 

                />
                <div className="content-wrap">
                    

                    <Route 
                        path="/" exact render= { props => { 
                            return (
                                <MainBoard 
                                {...props}
                                userData={this.props.activeUser} 
                                activeUserSessions = {this.props.activeUserSessions}
                                newSessionModal = {this.newSessionModal.bind(this)}
                                newBoardModal = {this.newBoardModal.bind(this)}
                                />
                            )
                        }} 
                    />

                    <Route 
                        path={`/boards/:sessionId`} exact render={ props => {                
                        return (                        
                            <SessionBlocks 
                            {...props}
                            userData={this.props.activeUser} 
                            activeUserSessions = {this.props.activeUserSessions}
                            newBoardModal = {this.newBoardModal.bind(this)}
                            newBoardForm = {this.state.newBoardForm}
                            addNewBoard = {this.addNewBoard.bind(this)}
                            handleChange = {this.handleChange.bind(this)}
                            /> )
                        }}
                    />              


                    { newSessionForm && 
                        < NewSessionForm
                            addNewSession={this.addNewSession.bind(this)}
                            handleChange = {this.handleChange.bind(this)}
                        />
                    }
                </div>
            </>
        );
    }


}



export default Home;
