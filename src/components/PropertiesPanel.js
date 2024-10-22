import React, { useState, useEffect } from 'react';
import '../styles/PropertiesPanel.css';

const PropertiesPanel = ({ selectedItem, updateItem, onSave, onLoad, onPreview, isPreview }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (selectedItem) {
      setContent(selectedItem.content);
    }
  }, [selectedItem]);

  if (!selectedItem) {
    return (
      <div className="properties-panel">
        <h2>Properties</h2>
        <button onClick={onSave} className="button-save">Save Layout</button>
        <button onClick={onLoad} className="button-load">Load Layout</button>
        <button onClick={onPreview} className="button-preview">
          {isPreview ? 'Exit Preview' : 'Preview Layout'}
        </button>
        <p className="info-message">Select an item to edit its properties</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSave = () => {
    updateItem(selectedItem.id, content);
  };

  return (
    <div className="properties-panel">
      <h2>Edit Properties</h2>
      {selectedItem.type === 'text' && (
        <div>
          <label>Text:</label>
          <input type="text" value={content} onChange={handleChange} className="input-field" />
        </div>
      )}
      {selectedItem.type === 'button' && (
        <div>
          <label>Button Label:</label>
          <input type="text" value={content} onChange={handleChange} className="input-field" />
        </div>
      )}
      {selectedItem.type === 'image' && (
        <div>
          <label>Image URL:</label>
          <input type="text" value={content} onChange={handleChange} className="input-field" />
        </div>
      )}
      {selectedItem.type === 'form' && (
        <div>
          <label>Form Content (e.g., Labels):</label>
          <textarea value={content} onChange={handleChange} className="input-area"></textarea>
        </div>
      )}
      {selectedItem.type === 'list' && (
        <div>
          <label>List Items (comma-separated):</label>
          <textarea value={content} onChange={handleChange} className="input-area"></textarea>
        </div>
      )}
      <button onClick={handleSave} className="button-save">Save</button>

      <h2>Preview Mode</h2>
      <button onClick={onPreview} className="button-preview">
        {isPreview ? 'Exit Preview' : 'Preview Layout'}
      </button>
    </div>
  );
};

export default PropertiesPanel;


