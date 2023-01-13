import React from 'react'
import './Player.css';
import { FaHeart } from 'react-icons/fa';
import { MdSkipPrevious, MdSkipNext, MdOutlinePlayCircleFilled, MdShuffle, MdRepeat, MdVolumeDown } from "react-icons/md";

const Player = () => {
  return (
    <div className="footer">
      <div className="footer__left">
        <span
          className="footer__albumLogo"
          alt={''}
        />
        <div className="footer__songInfo">
          <h4>Nothings's playing</h4>
        </div>
      </div>

      <div className="row footer__center">
        <div className="d-flex col-auto align-items-center mr-3">
          <MdSkipPrevious className="footer__icon" color="#0003" />
          <MdOutlinePlayCircleFilled
            fontSize={'32px'}
            className="footer__icon text-purple"
          />
          <MdSkipNext className="footer__icon" color="#0003" />
        </div>
        <div className="col">
          <div class="progress">
            <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
      <div className="footer__right ml-3">
        <FaHeart />
        <MdShuffle className="footer__green" />
        <MdRepeat className="footer__green" />
        <MdVolumeDown />
      </div>
    </div>
  )
}

export default Player