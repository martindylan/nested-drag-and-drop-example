import { useEffect, useState } from "react";
import { Droppable } from '@hello-pangea/dnd';

//  This component
const DroppableStrictMode = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <Droppable {...props}>
      {children}
    </Droppable>
  )
};
export default DroppableStrictMode;