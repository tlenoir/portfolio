import React from 'react';
import app from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
/* 
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
 */
const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEYS,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};
/* firebase initialize */
app.initializeApp(config);

const FirebaseContext = React.createContext();

function withFirebase(Component) {
    return props => (
        <FirebaseContext.Provider value={{ app, authUser: useAuthState(app.auth()).user }} >
            <Component {...props} />
        </FirebaseContext.Provider>
    );
};

export { withFirebase, FirebaseContext };