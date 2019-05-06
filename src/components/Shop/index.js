import React, { useState, useContext } from 'react';
import { withFirebase, FirebaseContext } from '../Firebase';
import { useListVals, /* useList */ } from 'react-firebase-hooks/database';
import posed from 'react-pose';

export default withFirebase(Shop);

const Box = posed.div({
    hidden: { height: 0 },
    visible: { height: 100 + '%' }
});

function Shop() {
    const value = useContext(FirebaseContext);
    const firebase = value.app;
    const user = value.authUser;
    const serverValue = firebase.database.ServerValue;
    const [isCreateElement, setCreate] = useState(false);
    const [files, setFiles] = useState([]);
    const [element, setElement] = useState({
        name: '',
        datecreated: '',
        text: '',
        user: '',
    });
    /* const test = useList(firebase.database().ref('shop'));
    test.value.map((i, key) => console.log('i', key, i.val())); */
    /* { error, loading, value } */
    const shopValues = useListVals(firebase.database().ref('shop'));

    function onChangeElement(event) {
        setElement({
            ...element,
            [event.target.name]: event.target.value
        });
    };
    function onChangeFiles(event) {
        /* is an array of... */
        setFiles(Object.values(event.target.files).map(file => file));
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
        }).then(() => {
            files.forEach((val, key) => {
                console.log(key);
                var uploadTask = firebase.storage().ref().child(`images/${uid}/${val.name}`)
                    .put(val);
                uploadTask.on('state_changed', function (snapshot) {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                        default: break;
                    }
                }, function (error) {
                    // Handle unsuccessful uploads
                    console.log(error);
                }, function () {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        console.log('File available at', downloadURL);
                    });/* gg */
                });
            });
        });
        setElement({
            ...element,
            name: '',
            text: '',
        });
        setFiles([]);
        setCreate(!isCreateElement);
        event.preventDefault();
    };

    return (
        <div>
            <button className="btn btn-primary mb-2" onClick={e => showFormToCreateElement(e)}>
                {isCreateElement ? 'Fermer' : 'Click pour créer'}
            </button>
            <Box
                className={isCreateElement ? 'visible' : 'invisible'}
                pose={isCreateElement ? 'visible' : 'hidden'} >
                <form onSubmit={e => doCreateItem(user.uid, e)}>
                    <div className='form-group'>
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
                    <div className='form-group'>
                        <label htmlFor="exampleFormControlTextarea1">Information</label>
                        <textarea
                            className="form-control"
                            name="text"
                            value={element.text}
                            onChange={e => onChangeElement(e)}
                            id="exampleFormControlTextarea1"
                            rows="3"></textarea>
                    </div>
                    <div className="custom-file">
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={e => onChangeFiles(e)}
                            className="custom-file-input"
                            id="customFile" />
                        <label className="custom-file-label" htmlFor="customFile">
                            {
                                files.length > 0 ?
                                    files.map((val, key) => <span key={key}>{val.name}; </span>)
                                    : 'Choose files'
                            }
                        </label>
                    </div>
                    <button
                        type="submit"
                        className='btn btn-primary mb-2'>Créer item</button>
                </form>
            </Box>
            <div>
                {shopValues.error && <strong>Error: {shopValues.error}</strong>}
                {shopValues.loading && <span>List:
                    <div className="spinner-border text-danger" role="status">
                        <span className="sr-only">Loading...</span>
                    </div></span>}
                {!shopValues.loading && shopValues.value && (
                    <React.Fragment>
                        <span>
                            List:{' '}
                            {shopValues.value.map((v, key) => (
                                <React.Fragment key={key}>{v.name}: {v.text}, </React.Fragment>
                            ))}
                        </span>
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

