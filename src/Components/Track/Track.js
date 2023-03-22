import styles from './Track.module.scss';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useState } from 'react';
import DragDroppableList from '../DragDroppableList/DragDroppableList';

function Track(props) {
  const { content, setContent } = props;
  const [disabled, setDisabled] = useState(false);

  const onDragStart = e => {
    setDisabled(true);
  }

  const onDragEnd = e => {
    setDisabled(false);
    if (!e.destination) return;

    if (e.type === 'LIST') {
      dropItem(e);
      return;
    }
    if (e.type === 'LIST_CONTAINER') {
      dropList(e);
      return;
    }
  }

  const dropItem = e => {
    const sourceDroppable = e.source.droppableId.match(/\d/g);
    const sourceIndex = e.source.index;
    const destDroppable = e.destination.droppableId.match(/\d/g);
    const destIndex = e.destination.index;

    if (sourceIndex === destIndex && sourceDroppable === destDroppable) return;

    let newTrack = structuredClone(content);
    newTrack[sourceDroppable].items.splice(sourceIndex, 1);
    newTrack[destDroppable].items.splice(destIndex, 0, content[sourceDroppable].items[sourceIndex]);
    setContent(newTrack);
  }

  const dropList = e => {
    const sourceDroppable = e.source.droppableId.match(/\d/g);
    const sourceIndex = e.source.index;
    const destDroppable = e.destination.droppableId.match(/\d/g);
    const destIndex = e.destination.index;

    if (sourceIndex === destIndex && sourceDroppable === destDroppable) return;

    let newTrack = structuredClone(content);
    let newList = { ...newTrack[sourceIndex] };
    newList.track = +destDroppable;
    newTrack.splice(sourceIndex, 1);
    newTrack.splice(destIndex, 0, newList);
    setContent(newTrack);
  }

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className={styles.Track}>
        <Droppable droppableId='track-0' type='LIST_CONTAINER' direction='horizontal'>
          {(provided, snapshot) => (
            <div className={`${styles.track} ${snapshot.isDraggingOver ? styles.isDraggingOver : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
              {content.map((list, i) => (
                <DragDroppableList key={i} provided={provided} snapshot={snapshot} list={list} index={i} disabled={disabled} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default Track;