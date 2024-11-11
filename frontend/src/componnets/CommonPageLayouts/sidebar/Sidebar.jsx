import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const sidebarItems = [
    { title: 'dashboard', path: '/home' }, // Matches /home
    { title: 'Production', path: '/home/production' },
    { title: 'Reporting', path: '/home/reporting' },
    { title: 'Communication', path: '/home/communication' },
    { title: 'Other', path: '/home/other' }
  ];

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        {sidebarItems.map((item, index) => (
          <li key={index} className="sidebar-item">
            <Link to={item.path} className="sidebar-link">
              <h3 className="sidebar-title">{item.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
