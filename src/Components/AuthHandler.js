import React, { Component } from "react";
import FacebookAuth from "./PlatformAuth/FacebookAuth";
import GoogleAuth from "./PlatformAuth/GoogleAuth";
import './AuthHandler.css';

class AuthHandler extends Component {
    render() {
        return (
            <div id="container">
                <div id="firebaseui-spa">
                    <div id="firebaseui-container">
                        <div id="firebaseui-container firebaseui-page-provider-sign-in firebaseui-id-page-provider-sign-in firebaseui-use-spinner" />
                        <div id="firebaseui-card-content">
                            <ul className="firebaseui-idp-list">
                                <GoogleAuth />
                                <FacebookAuth />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthHandler;