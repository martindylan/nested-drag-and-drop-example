import React, { useState } from 'react';
import Track from './Components/Track/Track';
import styles from './App.module.scss';

const fruits = ['apple', 'orange', 'banana', 'pear', 'strawberry', 'peach', 'plum'];
const vegetables = ['turnip', 'eggplant', 'celery', 'lettuce', 'pumpkin'];
const foods = ['mashed potatoes', 'burger', 'salad', 'barbeque'];

const makeList = (name, col, arr, offset) => {
  const items = Array.from(arr, (el, i) => ({
    id: `item-${i + offset}-${new Date().getTime()}`,
    content: el
  }))
  return ({
    name: name,
    items: items,
    col: col
  })
}

export default function App() {
  const [track, setTrack] = useState([makeList('Fruits', 'lightsteelblue', fruits, 0), makeList('Vegetables', 'paleturquoise', vegetables, fruits.length), makeList('Foods', 'palevioletred', foods, fruits.length + vegetables.length)]);
  return (
    <div className={styles.App}>
      <Track content={track} setContent={setTrack} />
    </div>
  )
}
