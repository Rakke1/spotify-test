import React from 'react'
import { getUserId } from '../hooks/useAuth';
import * as FirestoreService from '../services/firestore';

const TrackBox = ({track}) => {
  const handleFavour = () => {
    FirestoreService.authenticateAnonymously()
      .then(() => {
        const userId = getUserId();
        FirestoreService.addUserFavourite(userId, track);
      });
  };

  return (
    <div
      className="d-flex m-2 align-items-center flex-column"
      style={{ cursor: "pointer" }}
      onClick={handleFavour}
    >
      <img src={track?.images ? (track?.images[1]?.url || track?.images[0]?.url) : track.icons[0].url} alt="track" style={{ height: "100px", width: "100px", borderRadius: '10px' }} />
      <div className="d-flex text-center mt-3">
        <div>{track.name}</div>
      </div>
    </div>
  )
}

export default TrackBox