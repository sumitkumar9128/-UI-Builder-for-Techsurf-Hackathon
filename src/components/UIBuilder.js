import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import PropertiesPanel from './PropertiesPanel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '../styles/UIBuilder.css';

const UIBuilder = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [droppedItems, setDroppedItems] = useState([]);

  // Update a dropped item's content
  const updateItem = (id, newContent) => {
    setDroppedItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, content: newContent } : item))
    );
  };

  // Save the layout to localStorage
  const handleSave = () => {
    localStorage.setItem('savedLayout', JSON.stringify(droppedItems));
    alert('Layout saved successfully!');
  };

  // Load the layout from localStorage
  const handleLoad = () => {
    const savedLayout = localStorage.getItem('savedLayout');
    if (savedLayout) {
      setDroppedItems(JSON.parse(savedLayout));
      alert('Layout loaded successfully!');
    } else {
      alert('No layout found!');
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="ui-builder">
        <Sidebar />
        <Canvas setSelectedItem={setSelectedItem} droppedItems={droppedItems} setDroppedItems={setDroppedItems} />
        <PropertiesPanel selectedItem={selectedItem} updateItem={updateItem} />
      </div>
      <div className="controls">
        <button onClick={handleSave}>Save Layout</button>
        <button onClick={handleLoad}>Load Layout</button>
      </div>
    </DndProvider>
  );
};

export default UIBuilder;
