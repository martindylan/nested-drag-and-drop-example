import React from 'react'
import { Draggable } from 'react-beautiful-dnd';
import styles from './DraggableItem.module.scss';

export default function DraggableItem(props) {
  const { item, index, disabled } = props;

  return (
    <>
      <Draggable draggableId={`${item.id}`} index={index} isDragDisabled={disabled}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <div className={`${styles.DraggableItem} ${snapshot.isDragging ? styles.isDragging : ''}`}>
              <div className={styles.content}>
                {item.content}
              </div>
            </div>
          </div>
        )}
      </Draggable>
    </>
  )
}
