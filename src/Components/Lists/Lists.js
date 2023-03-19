import styles from './Lists.module.scss';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from 'react';
import DroppableList from '../DroppableList/DroppableList';
import DraggableItem from '../DraggableItem/DraggableItem';

const fruits = ['apple', 'orange', 'banana', 'pear', 'strawberry', 'peach', 'plum'];
const vegetables = ['turnip', 'eggplant', 'celery', 'lettuce', 'pumpkin'];

const makeList = (name, arr, offset) => {
  const items = Array.from(arr, (el, i) => ({
    id: `item-${i + offset}-${new Date().getTime()}`,
    content: el
  }))
  return ({
    name: name,
    items: items
  })
}

function Lists() {
  const [lists, setLists] = useState([makeList('Fruits', fruits, 0), makeList('Vegetables', vegetables, fruits.length)]);
  const [disabled, setDisabled] = useState(false);

  const onDragStart = e => {
    setDisabled(true);
  }

  const onDragEnd = e => {
    setDisabled(false);
    if (!e.destination) return;

    const sourceDroppable = e.source.droppableId;
    const sourceIndex = e.source.index;
    const destDroppable = e.destination.droppableId;
    const destIndex = e.destination.index;

    if (sourceIndex === destIndex && sourceDroppable === destDroppable) return;

    let newLists = structuredClone(lists);
    newLists[sourceDroppable].items.splice(sourceIndex, 1);
    newLists[destDroppable].items.splice(destIndex, 0, lists[sourceDroppable].items[sourceIndex]);
    setLists(newLists);
  }

  return (
    <div className={styles.Lists}>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        {lists.map((list, i) => (
          <DroppableList key={i} list={list} index={i}>
            {list.items.map((item, i) => (
              <DraggableItem key={item.id} item={item} index={i} disabled={disabled} />
            ))}
          </DroppableList>
        ))}
      </DragDropContext>
    </div>
  );
}

export default Lists;
