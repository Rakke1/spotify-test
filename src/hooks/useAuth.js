import { useState, useEffect, useCallback } from "react"
import { SPOTIFY_BASE_URL } from "../constants"

const getHeaders = () => {
  return {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + (btoa(process.env.REACT_APP_SPOTIFY_CLIENT_ID +
       ':' + process.env.REACT_APP_SPOTIFY_CLIENT_SECRET))
  };
}

const setItemExpires = (expires_in) => {
  window.localStorage.setItem("expiresIn", expires_in);
  window.localStorage.setItem("expireTokenDate", (new Date()).setSeconds((new Date()).getSeconds() + expires_in - 60));
}

const tokenIsExpired = () => {
  const expireDate = window.localStorage.getItem("expireTokenDate");
  return expireDate.valueOf() < (new Date()).valueOf(); 
}

export default function useAuth(code, state) {
  const [accessToken, setAccessToken] = useState();;
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  const getRefreshToken = useCallback(() => {
    const url = new URL(`${SPOTIFY_BASE_URL}/api/token`);
    const request = new Request(url, {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
      headers: getHeaders(),
    }) 

    if (tokenIsExpired()) {
      fetch(request)
      .then((res) => res.json())
      .then(res => {
        setAccessToken((oldValue) => res.access_token);
        setExpiresIn((oldValue) => res.expires_in);
        window.localStorage.setItem("accessToken", res.access_token);
        setItemExpires(res.expires_in);
      })
      .catch(() => {
        window.location = "/"
      })
    }
  }, [refreshToken]);

  useEffect(() => {
    let accessToken = window.localStorage.getItem("accessToken");
    let refreshToken = window.localStorage.getItem("refreshToken");
    let expiresIn = window.localStorage.getItem("expiresIn");
    if (accessToken) {
      setAccessToken((oldValue) => accessToken);
    }
    if (refreshToken) {
      setRefreshToken((oldValue) => refreshToken);
    }
    if (expiresIn) {
      setExpiresIn((oldValue) => expiresIn);
    }
  }, []);

  useEffect(() => {
    if (code && state) {
      const url = new URL(`${SPOTIFY_BASE_URL}/api/token`);
      const request = new Request(url, {
        method: 'POST',
        body: new URLSearchParams({
          code: code,
          redirect_uri: process.env.REACT_APP_BASE_URL,
          grant_type: 'authorization_code',
        }),
        headers: getHeaders(),
      }) 

      fetch(request)
        .then((res) => res.json())
        .then(res => {
          setAccessToken((oldValue) => res.access_token);
          setRefreshToken((oldValue) => res.refresh_token);
          setExpiresIn((oldValue) => res.expires_in);
          window.localStorage.setItem("accessToken", res.access_token);
          window.localStorage.setItem("refreshToken", res.refresh_token);
          setItemExpires(res.expires_in);
          window.history.pushState({}, null, "/");
        })
        .catch(() => {
          window.location = "/";
        })
    }
  }, [code, state]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return

    getRefreshToken();

    const interval = setInterval(() => {
      getRefreshToken();
    }, (30) * 1000);

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn, getRefreshToken]);

  return accessToken
}