import React, { Component } from 'react'
import firebase from '../config/firebase'
import { uuid } from 'uuidv4';

class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            displayName : '',
            email : '',
            id : '',
            password : '',
            activeForm : 'login'
        }
    }


    async login(e) {

        e.preventDefault();
        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
            this.props.getUserData(this.state.email);
        }).catch((error) => {
            console.log(error);
        })
    }


    async signup(e){
        e.preventDefault();
        this.setState({
            id : uuid()
        })
        await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
            this.props.registerNewUser(this.state.id, this.state.email, this.state.displayName);
        }).catch((error) => {
            console.log(error);
        })
    }


    changeForm(e) {

        this.setState({
            activeForm :  e.target.name === 'showSignup' ? 'signup' : 'login'
        })
    }


    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        }); 
    }


    render() {

        let {activeForm} = this.state


        if(activeForm === 'login'){


            return (


                <div className="auth-container">

                    <div className="auth-form">
    
                        <h1 className="title">
                            Sign in to use <span className="name-brand">Onstickly</span>
                        </h1>
    
                        <form>
                            <input 
                                type="email" 
                                name="email" 
                                value={this.state.email}
                                onChange={this.handleChange.bind(this)}
                                placeholder="Email Address"
                                autoComplete="false" 
                            />
                            <input 
                                type="password" 
                                name="password" 
                                value={this.state.password}
                                onChange={this.handleChange.bind(this)}
                                placeholder="Password"
                                autoComplete="false" 
                            />
                            <button
                                type="button"
                                onClick={this.login.bind(this)}
                            >
                                Login
                            </button>
                        </form>
    
                    </div>
    
                    <div className="auth-footnote">
                        If you already have an account, <button type="button" name="showSignup" onClick={this.changeForm.bind(this)}>
                            Signup here
                        </button>
                    </div>
    
                </div>
    
            );



        } else {



            return (
                <div className="auth-container">
    
                    <div className="auth-form">
    
                        <h1 className="title">
                            Sign up to use <span className="name-brand">Onstickly</span>
                        </h1>
    
                        <form>
                            <input 
                                type="text" 
                                name="displayName" 
                                value={this.state.displayName}
                                onChange={this.handleChange.bind(this)}
                                placeholder="Firstname"
                            />
                            <input 
                                type="email" 
                                name="email" 
                                value={this.state.email}
                                onChange={this.handleChange.bind(this)}
                                placeholder="Email Address"
                            />
                            <input 
                                type="password" 
                                name="password" 
                                value={this.state.password}
                                onChange={this.handleChange.bind(this)}
                                placeholder="Password"
                            />
                            <button
                                type="submit"
                                onClick={this.signup.bind(this)}
                            >
                                Create account
                            </button>
                        </form>
                    </div>

                    <div className="auth-footnote">
                        If you are a member, <button type="button" name="showSignin" onClick={this.changeForm.bind(this)}> Sign in here</button>
                    </div>

                </div>
            );


        }
    
    }
}

export default Login;