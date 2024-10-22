import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import PropertiesPanel from './PropertiesPanel';
import Preview from './Preview';
import StackInstance from '../contentstackConfig';
import '../styles/Editor.css';

const Editor = () => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const [content, setContent] = useState({});

  const pollingInterval = 5000;

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await StackInstance.ContentType('home_page')
          .Query()
          .toJSON()
          .find();
        setContent(response[0]); 
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();

    const intervalId = setInterval(() => {
      fetchContent();
    }, pollingInterval);

    return () => clearInterval(intervalId);
  }, []);

  const handleSave = () => {
    localStorage.setItem('canvasLayout', JSON.stringify(droppedItems));
    alert('Layout saved!');
  };

  const handleLoad = () => {
    const savedLayout = localStorage.getItem('canvasLayout');
    if (savedLayout) {
      setDroppedItems(JSON.parse(savedLayout));
    } else {
      alert('No saved layout found.');
    }
  };

  const handlePreview = () => {
    setIsPreview(!isPreview);
  };

  const updateItem = (id, newContent) => {
    const updatedItems = droppedItems.map((item) =>
      item.id === id ? { ...item, content: newContent } : item
    );
    setDroppedItems(updatedItems);
  };

  return (
    <div className="editor">
      {isPreview ? (
        <Preview layout={droppedItems} content={content} />
      ) : (
        <>
          <Sidebar />
          <Canvas
            droppedItems={droppedItems}
            onUpdate={setDroppedItems}
            setSelectedItem={setSelectedItem}
          />
          <PropertiesPanel
            selectedItem={selectedItem}
            updateItem={updateItem}
            onSave={handleSave}
            onLoad={handleLoad}
            onPreview={handlePreview}
            isPreview={isPreview}
          />
        </>
      )}
    </div>
  );
};

export default Editor;
