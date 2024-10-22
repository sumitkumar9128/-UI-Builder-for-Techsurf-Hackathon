import React from 'react';


const Preview = ({ layout, content }) => {
  return (
    <div className="preview">
      {layout.map((item) => {
        switch (item.type) {
          case 'text':
            return <h1 key={item.id}>{content.title || 'Sample Title'}</h1>;
          case 'image':
            return (
              <img
                key={item.id}
                src={content.banner_image?.url || 'placeholder-image-url'}
                alt={content.title || 'Sample Image'}
              />
            );
          case 'button':
            return <button key={item.id}>{item.content || 'Click Me'}</button>;
          case 'list':
            return (
              <ul key={item.id}>
                {(item.content || '').split(',').map((listItem, index) => (
                  <li key={index}>{listItem}</li>
                ))}
              </ul>
            );
          
          default:
            return <div key={item.id}>Unknown Component</div>;
        }
      })}
    </div>
  );
};

export default Preview;
