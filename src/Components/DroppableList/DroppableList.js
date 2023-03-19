import React from 'react'
import { Droppable } from 'react-beautiful-dnd';
import DraggableItem from '../DraggableItem/DraggableItem';
import styles from './DroppableList.module.scss';

export default function DroppableList(props) {
  const { list, index } = props;
  return (
    <Droppable droppableId={`${index}`} type='LIST'>
      {(provided, snapshot) => (
        <div className={`${styles.DroppableList} ${snapshot.isDraggingOver ? styles.isDraggingOver : ''}`}>
          <div className={styles.title}>
            {list.name}
          </div>
          <div className={styles.list} ref={provided.innerRef} {...provided.droppableProps}>
            {props.children}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  )
}


