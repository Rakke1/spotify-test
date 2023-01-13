import { useRef, useState } from "react";
import Header from "./Header";
import useSpotify from "./hooks/useSpotify";
import Sidebar from "./Sidebar";
import SliderHead from "./Components/SliderHead";
import TrackBox from "./Components/TrackBox";

export default function Dashboard({accessToken}) {
  const [darkMode, setDarkMode] = useState(false);
  const [newReleases, feturedPlaylists, categories] = useSpotify({accessToken});
  const sliderReleaseRef = useRef(null);
  const sliderFeaturedRef = useRef(null);
  const sliderCategoriesRef = useRef(null);

  return (
    <main className={darkMode ? 'dark' : ''}>
      <Sidebar/>
      <div style={{width: "100%", overflow: "hidden"}}>
        <Header setDarkMode={setDarkMode}/>
        <div style={{padding: '0 32px 0 32px'}}>
          <div className="slider">
            <SliderHead title="Released this week" sliderRef={sliderReleaseRef}/>
           
            <div className="slides" ref={sliderReleaseRef}>
              {newReleases && newReleases.map((newRelease, index) => (
                <div key={newRelease.id} className="slide" id={"slide-release-"+index}>
                  <TrackBox track={newRelease} />
                </div>
              ))}
            </div>
          </div>
          <div className="slider">
            <SliderHead title="Featured playlists" sliderRef={sliderFeaturedRef}/>
           
            <div className="slides" ref={sliderFeaturedRef}>
              {feturedPlaylists && feturedPlaylists.map((feturedPlaylist, index) => (
                <div key={feturedPlaylist.id} className="slide" id={"slide-featured-"+index}>
                  <TrackBox track={feturedPlaylist} />
                </div>
              ))}
            </div>
          </div>
          <div className="slider">
            <SliderHead title="Browse" sliderRef={sliderCategoriesRef}/>
           
            <div className="slides" ref={sliderCategoriesRef}>
              {categories && categories.map((category, index) => (
                <div key={category.id} className="slide" id={"slide-featured-"+index}>
                  <TrackBox track={category} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}