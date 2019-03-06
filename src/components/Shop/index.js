import React, { Component, useState } from 'react'

export default class ShopComponent extends Component {
  render() {
    return (
      <div>
        <RandomList />
      </div>
    )
  }
}
function RandomList() {
  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: items.length,
        value: Math.random() * 100
      }
    ]);
    console.log('items', items)
  };

  return (
    <>
      <button onClick={addItem}>Add a number</button>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.value}</li>
        ))}
      </ul>
    </>
  );
}
