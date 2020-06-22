import React, { Component } from "react";
import firebase from 'firebase/app';

class FacebookAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            currentUser: null,
            message: "",
        };
    }

    handleLogin() {
        console.log("Attempting Facebook authentication...");
        const provider = new firebase.auth.FacebookAuthProvider();
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
            console.log("FACEBOOK AUTH ERROR:\n" + errorCode + " --> " + errorMessage + "\n" + email + "\n" + credential);
            console.log("Please note, I am not currently set up to do anything with Facebook, so this will fail.")
        });
    }

    render() {
        return (
            <li className="firebaseui-list-item">
                <button onClick={this.handleLogin} className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-facebook firebaseui-id-idp-button">
                    <span className="firebaseui-idp-icon-wrapper">
                        <img className="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg" />
                    </span>
                    <span className="firebaseui-idp-text firebaseui-idp-text-long">Sign in with Facebook</span>
                    <span className="firebaseui-idp-text firebaseui-idp-text-short">Facebook</span>
                </button>
            </li>
        );
    }
}

export default FacebookAuth;