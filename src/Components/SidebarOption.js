import React from 'react'

const SidebarOption = ({path, title, Icon, active}) => {
  return (
    <li className="nav-item">
      <a href={path} className={`d-flex nav-link text-white ${active ? 'active ' : ''}`}>
        <Icon/>
        <span className="moblie-hide ml-3">{title}</span>
      </a>
    </li>
  )
}

export default SidebarOption