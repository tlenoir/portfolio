import React, { useContext } from 'react';
import { withFirebase, FirebaseContext } from '../Firebase/firebase';
import { useLocalStorage } from '../../store/index';

export default withFirebase(RandomList);

function RandomList() {
  const value = useContext(FirebaseContext);
  const user = value.authUser;
  const [random_value, setValue] = useLocalStorage('random_items', JSON.stringify([]));
  const items = JSON.parse(random_value);

  const addItem = () => {
    items.push({
      id: items.length,
      value: Math.random() * 100
    });
    setValue(JSON.stringify(items));
  };
  const clearAll = () => {
    localStorage.removeItem('random_items');
    window.location.reload();
  };

  console.log('hello random page!', random_value);

  return (
    <>
      {
        user ? <div>{user.uid}</div> : <div>Non utilisateur!</div>
      }
      <button onClick={addItem}>Add a number</button>
      {
        items.length > 0 && <button onClick={clearAll}>Clear a number</button>
      }
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.value}</li>
        ))}
      </ul>
    </>
  );
};
