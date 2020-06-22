import React, { Component } from "react";
import firebase from 'firebase/app';

class GoogleAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            currentUser: null,
            message: "",
        };
    }

    handleLogin() {
        console.log("Attempting Google authentication...");
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
            let token = result.credential.accessToken;
            let user = result.user;
            console.log(user.displayName + " signed in");
        })
        .catch(function(error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            // The email of the user's account used.
            let email = error.email;
            let credential = error.credential;
            console.log("GOOGLE AUTH ERROR:\n" + errorCode + " --> " + errorMessage + "\n" + email + "\n" + credential);
        });
    }

    render() {
        return (
            <li className="firebaseui-list-item">
                <button onClick={this.handleLogin} className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-google firebaseui-id-idp-button">
                    <span className="firebaseui-idp-icon-wrapper">
                        <img className="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"/>
                    </span>
                    <span className="firebaseui-idp-text firebaseui-idp-text-long">Sign in with Google</span>
                    <span className="firebaseui-idp-text firebaseui-idp-text-short">Google</span>
                </button>
            </li>
        );
    }
}

export default GoogleAuth;