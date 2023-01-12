import React from 'react'
import { FaHeadphonesAlt, FaSearch, FaHeart, FaPlayCircle, FaStream } from 'react-icons/fa';
import SidebarOption from './Components/SidebarOption';

const Sidebar = () => {
  return (
    <div className="sidebar bg-purple">
      <div className="align-self-center mt-3">
        <a href="#profile" class="d-flex align-items-center justify-content-center text-white text-decoration-none mb-3">
          <img src="https://github.com/mdo.png" alt="" width="60" height="60" className="rounded-circle profile-avatar"/>
        </a>
        <strong className="moblie-hide text-white">Bob Smith</strong>
      </div>
      <hr/>
      <ul className="nav nav-pills flex-column">
        <SidebarOption path="/dashboard" title="Discover" Icon={FaHeadphonesAlt} active={true} />
        <SidebarOption path="/#search" title="Search" Icon={FaSearch} active={false} />
        <SidebarOption path="/#favourites" title="Favourites" Icon={FaHeart} active={false} />
        <SidebarOption path="/#playlists" title="Playlists" Icon={FaPlayCircle} active={false} />
        <SidebarOption path="/#charts" title="Charts" Icon={FaStream} active={false} />
      </ul>
  </div>
  )
}

export default Sidebar