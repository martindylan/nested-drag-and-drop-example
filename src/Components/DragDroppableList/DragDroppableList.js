import React from 'react'
import { Draggable, Droppable } from '@hello-pangea/dnd';
import DraggableItem from '../DraggableItem/DraggableItem';
import styles from './DragDroppableList.module.scss';

export default function DragDroppableList(props) {
  const { list, index, disabled } = props;

  return (
    <Draggable draggableId={`${index}`} index={index} isDragDisabled={disabled}>
      {(provided, snapshot) => (
        <div className={`${styles.DragDroppableList} ${snapshot.isDragging ? styles.isDragging : ''}`} ref={provided.innerRef} {...provided.draggableProps}>
          <div style={{ background: `linear-gradient(180deg, ${list.col} 66%, white)` }} className={styles.title} {...provided.dragHandleProps}>
            {list.name}
          </div>
          <Droppable droppableId={`list-${index}`} type='LIST'>
            {(provided, snapshot) => (
              <div className={`${styles.list} ${snapshot.isDraggingOver ? styles.isDraggingOver : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
                {list.items.map((item, i) => (
                    <DraggableItem key={item.id} item={item} index={i} disabled={disabled} />
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}


