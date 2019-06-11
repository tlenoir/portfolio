import React from 'react';
import app from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
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
/* const authState = () => {
    return useAuthState(app.auth()).user
}; */

function withFirebase(Component) {
    return props => (
        <FirebaseContext.Provider value={{ app, authUser: useAuthState(app.auth()).user }} >
            <Component {...props} />
        </FirebaseContext.Provider>
    );
    /* how to use it: export default withFirebase(ExempleComponent) */
};

function WithAuthentication({ children }) {
    const user = useAuthState(app.auth()).user;
    return (
        <FirebaseContext.Provider value={{ app, user }} >
            {children}
        </FirebaseContext.Provider>
    );
    /* how to use it: export default function App() {
        return (
            <WithAuthentication>
                <ExempleComponent />
            </WithAuthentication>
        );
    }; 
    */
};

export { withFirebase, FirebaseContext, WithAuthentication };