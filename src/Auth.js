import React, {Component} from 'react';

var firebase = require('firebase');

class Auth extends Component {

    tryLogin = (event) => {
        var email = this.refs.email.value;
        var password = this.refs.password.value;

        console.log(email, password);
        var auth = firebase.auth();

        var promise = auth.signInWithEmailAndPassword(email, password);

        promise.then(user => {
            console.log(user);
            var error = "Logged successfully," + user.email;
            this.setState({error: error});

            var btn = document.getElementById('logout');
            btn.classList.remove('hide');
        }).catch(error => {
            console.log(error);
            this.setState({error: error.message});
        });
    };

    tryRegister = (event) => {
        var email = this.refs.email.value;
        var password = this.refs.password.value;

        console.log(email, password);
        var auth = firebase.auth();

        var promise = auth.createUserWithEmailAndPassword(email, password);

        promise.then(user => {
            console.log(user);
            var error = "Thank you for registering," + user.email;
            this.setState({error: error});
            firebase.database().ref('users/' + user.uid).set({
                email: user.email
            });

        }).catch(error => {
            console.log(error);
            this.setState({error: error.message});
        });
    };

    tryLogout = (event) => {
        firebase.auth().signOut();

        var btn = document.getElementById('logout');
        btn.classList.add('hide');

    };

    tryGoogleLogin = (event) => {
        console.log("gggoel");
        var provider = new firebase.auth.GoogleAuthProvider();

        var promise = firebase.auth().signInWithPopup(provider);

        promise.then(result => {
            console.log(result);
            var user = result.user;

            firebase.database().ref('users/' + user.uid).set({
                name: user.displayName,
                email: user.email
            });

            var error = "Logged successfully," + user.email;
            this.setState({error: error});

            var btn = document.getElementById('logout');
            btn.classList.remove('hide');

        }).catch(error => {
            var error = error.message;
            this.setState({error: error});
        });
    };

    constructor(props) {
        super(props);

        this.state = {
            error: ''
        };

        var config = {
            apiKey: "AIzaSyA_dDgQti0iqEcgR6uQwuE9FghGdCxFons",
            authDomain: "fir-login-ed1d7.firebaseapp.com",
            databaseURL: "https://fir-login-ed1d7.firebaseio.com",
            projectId: "fir-login-ed1d7",
            storageBucket: "fir-login-ed1d7.appspot.com",
            messagingSenderId: "468814950541"
        };
        firebase.initializeApp(config);


        this.tryLogin = this.tryLogin.bind(this);
        this.tryRegister = this.tryRegister.bind(this);
        this.tryLogout = this.tryLogout.bind(this);
        this.tryGoogleLogin = this.tryGoogleLogin.bind(this);
    }

    render() {
        return (
            <div>
                <form>
                    <input type="email" ref="email" name='email' placeholder="Enter your email"/><br/>
                    <input type="password" ref="password" name='password' placeholder="Enter your password"/>
                    <p>{this.state.error}</p>

                    <br/>
                    <button onClick={this.tryLogin} type="button"> Login</button>
                    <button onClick={this.tryRegister} type="button"> SignUp</button>
                    <button onClick={this.tryLogout} id="logout" className="hide" type="button"> Logout</button>
                    <br/>
                    <button onClick={this.tryGoogleLogin} id="google" className="" type="button"> Sign In with Google
                    </button>
                </form>
            </div>
        );
    }
}

export default Auth;