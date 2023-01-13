import React, { useState } from 'react'
import { FaHeadphonesAlt, FaSearch, FaHeart, FaPlayCircle, FaStream } from 'react-icons/fa';
import SearchInput from './Components/SearchInput';
import SidebarOption from './Components/SidebarOption';

const Sidebar = ({searchValue, setSearchValue}) => {
  const [showSearch, setShowSearch] = useState(false);

  const onSearchClick = (e) => {
    e.preventDefault();
    setShowSearch((oldValue) => !oldValue);
  }

  return (
    <div className="sidebar bg-purple">
      <div className="align-self-center mt-3">
        <a href="#profile" className="d-flex align-items-center justify-content-center text-white text-decoration-none mb-3">
          <img src="https://github.com/mdo.png" alt="avatar" width="60" height="60" className="rounded-circle profile-avatar"/>
        </a>
        <strong className="moblie-hide text-white">Bob Smith</strong>
      </div>
      <hr/>
      <ul className="nav nav-pills flex-column">
        <SidebarOption path="/dashboard" title="Discover" Icon={FaHeadphonesAlt} active={true} />
        {showSearch ? <SearchInput setSearchValue={setSearchValue} searchValue={searchValue}/> : ''}
        <SidebarOption path="#search" onClick={onSearchClick} title="Search" Icon={FaSearch} active={false} />
        <SidebarOption path="#favourites" title="Favourites" Icon={FaHeart} active={false} />
        <SidebarOption path="#playlists" title="Playlists" Icon={FaPlayCircle} active={false} />
        <SidebarOption path="#charts" title="Charts" Icon={FaStream} active={false} />
      </ul>
  </div>
  )
}

export default Sidebar