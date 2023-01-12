import React from "react"
import { SPOTIFY_BASE_URL } from "./constants"
import { generateRandomString } from "./helpers/stringHelper"

const AUTH_URL =
  `${SPOTIFY_BASE_URL}/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}` +
  `&response_type=code&redirect_uri=${process.env.REACT_APP_BASE_URL}&scope=user-library-read&state=${generateRandomString(16)}`

export default function Login() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#1b1f22" }}
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login With Spotify
      </a>
    </div>
  )
}