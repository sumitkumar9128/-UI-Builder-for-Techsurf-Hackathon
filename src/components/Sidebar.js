import React from 'react';
import { useDrag } from 'react-dnd';
import '../styles/Sidebar.css';

export const COMPONENT_TYPES = {
  TEXT: 'text',
  BUTTON: 'button',
  IMAGE: 'image',
  FORM: 'form',
  LIST: 'list',
};

const SidebarItem = ({ type, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="sidebar-item"
    >
      {label}
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Component Library</h2>
      <SidebarItem type={COMPONENT_TYPES.TEXT} label="Text Block" />
      <SidebarItem type={COMPONENT_TYPES.BUTTON} label="Button" />
      <SidebarItem type={COMPONENT_TYPES.IMAGE} label="Image" />
      <SidebarItem type={COMPONENT_TYPES.FORM} label="Form" />
      <SidebarItem type={COMPONENT_TYPES.LIST} label="List" />
    </div>
  );
};

export default Sidebar;
