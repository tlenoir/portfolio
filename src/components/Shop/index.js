import React, { useState, useContext } from 'react';
import { withFirebase, FirebaseContext } from '../Firebase';
import { useListVals } from 'react-firebase-hooks/database';

export default withFirebase(Shop);

function Shop() {
    const value = useContext(FirebaseContext);
    const firebase = value.app;
    const user = value.authUser;
    const serverValue = firebase.database.ServerValue;
    const [isCreateElement, setCreate] = useState(false);
    const [element, setElement] = useState({
        name: '',
        datecreated: '',
        text: '',
        user: '',
    });
    /* { error, loading, value } */
    const listValue = useListVals(firebase.database().ref('shop'));

    function onChangeElement(event) {
        setElement({
            ...element,
            [event.target.name]: event.target.value
        });
    };
    function showFormToCreateElement(event) {
        setCreate(!isCreateElement);
        event.preventDefault();
    };

    function doCreateItem(uid, event) {
        firebase.database().ref('shop').push({
            name: element.name,
            datecreated: serverValue.TIMESTAMP,
            text: element.text,
            user: uid
        });
        setElement({
            ...element,
            name: '',
            text: '',
        });
        setCreate(!isCreateElement);
        event.preventDefault();
    };

    return (
        <div>
            <button className="btn btn-primary mb-2" onClick={e => showFormToCreateElement(e)}>
                {isCreateElement ? 'Fermer' : 'Click pour créer'}
            </button>
            {
                isCreateElement &&
                <form onSubmit={e => doCreateItem(user.uid, e)}>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Nom</label>
                        <input
                            type="texte"
                            value={element.name}
                            name="name"
                            onChange={e => onChangeElement(e)}
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="name@example.com" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Information</label>
                        <textarea
                            className="form-control"
                            name="text"
                            value={element.text}
                            onChange={e => onChangeElement(e)}
                            id="exampleFormControlTextarea1"
                            rows="3"></textarea>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary mb-2">Créer item</button>
                </form>
            }
            <p>
                {listValue.error && <strong>Error: {listValue.error}</strong>}
                {listValue.loading && <span>List:
                    <div className="spinner-border text-danger" role="status">
                        <span className="sr-only">Loading...</span>
                    </div></span>}
                {!listValue.loading && listValue.value && (
                    <React.Fragment>
                        <span>
                            List:{' '}
                            {listValue.value.map((v, key) => (
                                <React.Fragment key={key}>{v.name}: {v.text}, </React.Fragment>
                            ))}
                        </span>
                    </React.Fragment>
                )}
            </p>
        </div>
    );
};

