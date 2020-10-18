import React from 'react';
import { ItemTypes } from './Constants';
import { useDrop } from 'react-dnd';
const HeadingDropZone = ({ children, moveHeading, position }) => {
  const [{ isOver, source }, drop] = useDrop({
    accept: ItemTypes.HEADING,
    drop: () => handleMotion(source, position),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      source: monitor.getItem(),
    }),
  });

  const handleMotion = (from, to) => {
    moveHeading(from.position, to);
  };
  return (
    <div
      ref={drop}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </div>
  );
};

export default HeadingDropZone;
