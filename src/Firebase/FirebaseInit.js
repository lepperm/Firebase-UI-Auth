import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/app'
import 'firebase/firestore';

import * as firebaseui from 'firebaseui';

import firebaseConfig from './FirebaseConfig.js';

// Initialize Firebase
if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

const ui = new firebaseui.auth.AuthUI(firebase.auth());

const firebaseUIlauncher = function (elementId) {
    // Temp variable to hold the anonymous user data if needed.
    var data = null;
    // Hold a reference to the anonymous current user.
    var anonymousUser = firebase.auth().currentUser;

    ui.start('#firebaseui-auth-container', {
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                return false;
            },
            uiShown: function() {
                // The widget is rendered.
                // Hide the loader.
                //document.getElementById('loader').style.display = 'none';
            },
            // signInFailure callback must be provided to handle merge conflicts which
            // occur when an existing credential is linked to an anonymous user.
            signInFailure: function(error) {
                // For merge conflicts, the error.code will be
                // 'firebaseui/anonymous-upgrade-merge-conflict'.
                if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
                    return Promise.resolve();
                }
                // The credential the user tried to sign in with.
                var cred = error.credential;
                // Copy data from anonymous user to permanent user and delete anonymous
                // user.
                // ...
                // Finish sign-in after data is copied.
                return firebase.auth().signInWithCredential(cred);
            }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        //signInSuccessUrl: '<url-to-redirect-to-on-success>',
        // Whether to upgrade anonymous users should be explicitly provided.
        // The user must already be signed in anonymously before FirebaseUI is rendered.
        autoUpgradeAnonymousUsers: true,
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            {
                provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                scopes: [
                    'https://www.googleapis.com/auth/userinfo.profile',
                    //'https://www.googleapis.com/auth/user.birthday.read'
                ],
                customParameters: {
                    // Forces account selection even when one account
                    // is available.
                    prompt: 'select_account'
                }
            },
            //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            //firebase.auth.TwitterAuthProvider.PROVIDER_ID, // Twitter does not support scopes
            //firebase.auth.GithubAuthProvider.PROVIDER_ID,
            //firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        //tosUrl: '<your-tos-url>',
        // Privacy policy url.
        //privacyPolicyUrl: '<your-privacy-policy-url>'
    });
}

export {
    auth,
    db,
    firebaseUIlauncher
}