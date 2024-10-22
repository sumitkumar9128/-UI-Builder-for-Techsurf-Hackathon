import React from 'react';

const Canvas = ({ droppedItems, onUpdate, setSelectedItem }) => {
  const handleItemClick = (item) => {
    setSelectedItem(item); 
  };

  return (
    <div className="canvas">
      {droppedItems.map((item) => (
        <div
          key={item.id}
          className="canvas-item"
          onClick={() => handleItemClick(item)}
        >
          {item.type === 'text' && <p>{item.content || 'Text'}</p>}
          {item.type === 'image' && <img src={item.content || 'image-url'} alt="Image" />}
          {item.type === 'button' && <button>{item.content || 'Button'}</button>}
          { }
        </div>
      ))}
    </div>
  );
};

export default Canvas;
