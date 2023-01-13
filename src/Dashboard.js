import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Header from "./Header";
import useSpotify from "./hooks/useSpotify";
import Sidebar from "./Sidebar";
import SliderHead from "./Components/SliderHead";
import TrackBox from "./Components/TrackBox";
import Player from "./Player";

export default function Dashboard({accessToken}) {
  const [darkMode, setDarkMode] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [newReleases, feturedPlaylists, categories] = useSpotify({accessToken});
  const sliderReleaseRef = useRef(null);
  const sliderFeaturedRef = useRef(null);
  const sliderCategoriesRef = useRef(null);

  const filteredRelease = useCallback(() => {
    if (!searchValue) {
      return newReleases;
    }
    const lowerSearchValue = searchValue.toLocaleLowerCase();
    return newReleases.filter((newRelease) => newRelease.name.toLocaleLowerCase().includes(lowerSearchValue));
  }, [newReleases, searchValue])();

  const filteredPlaylists = useCallback(() => {
    if (!searchValue) {
      return feturedPlaylists;
    }
    const lowerSearchValue = searchValue.toLocaleLowerCase();
    return feturedPlaylists.filter((playlist) => playlist.name.toLocaleLowerCase().includes(lowerSearchValue));
  }, [feturedPlaylists, searchValue])();

  const filteredCategories = useCallback(() => {
    if (!searchValue) {
      return categories;
    }
    const lowerSearchValue = searchValue.toLocaleLowerCase();
    return categories.filter((category) => category.name.toLocaleLowerCase().includes(lowerSearchValue));
  }, [categories, searchValue])();

  return (
    <main className={darkMode ? 'dark' : ''}>
      <Sidebar searchValue={searchValue} setSearchValue={setSearchValue}/>
      <div style={{width: "100%", overflow: "hidden"}}>
        <Header setDarkMode={setDarkMode}/>
        <div style={{padding: '0 32px 0 32px'}}>
          <div className="slider">
            <SliderHead title="Released this week" sliderRef={sliderReleaseRef}/>
           
            <div className="slides" ref={sliderReleaseRef}>
              {newReleases && filteredRelease.map((newRelease, index) => (
                <div key={newRelease.id} className="slide" id={"slide-release-"+index}>
                  <TrackBox track={newRelease} />
                </div>
              ))}
            </div>
          </div>
          <div className="slider">
            <SliderHead title="Featured playlists" sliderRef={sliderFeaturedRef}/>
           
            <div className="slides" ref={sliderFeaturedRef}>
              {filteredPlaylists && filteredPlaylists.map((feturedPlaylist, index) => (
                <div key={feturedPlaylist.id} className="slide" id={"slide-featured-"+index}>
                  <TrackBox track={feturedPlaylist} />
                </div>
              ))}
            </div>
          </div>
          <div className="slider">
            <SliderHead title="Browse" sliderRef={sliderCategoriesRef}/>
           
            <div className="slides" ref={sliderCategoriesRef}>
              {filteredCategories && filteredCategories.map((category, index) => (
                <div key={category.id} className="slide" id={"slide-featured-"+index}>
                  <TrackBox track={category} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Player />
      </div>
    </main>
  )
}