import React, { Component } from 'react';
import Header from './Header'
import MainBoard from './MainBoard'

class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            newSessionForm : false,
            sessionName : '',
        }
    }


    newBoardModal(){

        this.setState({ 
          newSessionForm : true
        });
        
    }


    addNewBoard(e){
        this.props.handleAddNewSession(this.state.sessionName)
        this.setState({
            newSessionForm : false
        });
    }



    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        }); 
    }
    

    render(){

        let {newSessionForm} = this.state

        return (
            <>
                <Header 
                    logout={this.props.logout}
                    userData={this.props.activeUser} 

                />
                <div className="content-wrap">
                    <MainBoard 
                        userData={this.props.activeUser} 
                        activeUserSessions = {this.props.activeUserSessions}
                        newBoardModal = {this.newBoardModal.bind(this)}
                     />
                    { newSessionForm && 
                        <div className="modal-container">
                            <div className="modal boardModal">
                                <form>
                                    <label>Name this session</label>
                                    <input 
                                        type="text"
                                        name="sessionName"
                                        placeholder="Session name..."
                                        onChange={this.handleChange.bind(this)}
                                    />
                                    <button 
                                        type="button"
                                        onClick={this.addNewBoard.bind(this)}
                                    >
                                        Create
                                    </button>  
                                </form>              
                            </div>
                        </div>
                    }
                </div>
            </>
        );
    }


}



export default Home;


