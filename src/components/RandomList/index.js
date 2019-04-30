import React, { useState, useContext } from 'react';
import { withFirebase, FirebaseContext } from '../Firebase/firebase';

export default withFirebase(RandomList);

function RandomList() {
  const value = useContext(FirebaseContext);
  const user = value.authUser;
  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: items.length,
        value: Math.random() * 100
      }
    ]);
  };

  return (
    <>
      {
        user ? <div>{user.uid}</div> : <div>Non utilisateur!</div>
      }
      <button onClick={addItem}>Add a number</button>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.value}</li>
        ))}
      </ul>
    </>
  );
};
