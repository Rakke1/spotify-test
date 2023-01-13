import { useState, useEffect, useCallback } from "react"
import { SPOTIFY_API_BASE_URL, SPOTIFY_BASE_URL } from "../constants"
import * as FirestoreService from '../services/firestore';

const getAuthHeaders = () => ({
  'Content-Type': 'application/x-www-form-urlencoded',
  'Authorization': 'Basic ' + (btoa(process.env.REACT_APP_SPOTIFY_CLIENT_ID +
      ':' + process.env.REACT_APP_SPOTIFY_CLIENT_SECRET))
});

export const getUserHeaders = (accessToken) => ({
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + accessToken
});

const setItemExpires = (expires_in) => {
  window.localStorage.setItem("expireTokenDate", (new Date()).setSeconds((new Date()).getSeconds() + expires_in - 60));
}

const tokenIsExpired = () => {
  const expireDate = window.localStorage.getItem("expireTokenDate");
  return expireDate?.valueOf() < (new Date()).valueOf(); 
}

const setUserId = (userId) => {
  window.localStorage.setItem("userId", userId);
}

export const getUserId = () => {
  return window.localStorage.getItem("userId");
}

export default function useAuth(code, state) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();

  const getRefreshToken = useCallback(() => {
    const url = new URL(`${SPOTIFY_BASE_URL}/api/token`);
    const request = new Request(url, {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
      headers: getAuthHeaders(),
    }) 
    if (tokenIsExpired()) {
      fetch(request)
      .then((res) => res.json())
      .then(res => {
        setAccessToken((oldValue) => res.access_token);
        window.localStorage.setItem("accessToken", res.access_token);
        setItemExpires(res.expires_in);
      })
      .catch(() => {
        window.location = "/"
      })
    }
  }, [refreshToken]);

  const setUserToFirebase = useCallback((userId, code) => {
    FirestoreService.authenticateAnonymously()
      .then(() => {
        FirestoreService.getUser(userId).then((userData) => {
          if (userData.exists() === false) {
            FirestoreService.createUser(userId, code);
          }
        })
      })
  }, []);

  const getUserProfile = useCallback((accessToken, code) => {
    const url = new URL(`${SPOTIFY_API_BASE_URL}/me`);
    const request = new Request(url, {
      method: 'GET',
      headers: getUserHeaders(accessToken),
    });

    fetch(request)
      .then((res) => res.json())
      .then(res => {
        setUserId(res.id);
        setUserToFirebase(res.id, code);
      });
  }, [setUserToFirebase]);

  const spotifyLogin = useCallback((code) => {
    const url = new URL(`${SPOTIFY_BASE_URL}/api/token`);
    const request = new Request(url, {
      method: 'POST',
      body: new URLSearchParams({
        code: code,
        redirect_uri: process.env.REACT_APP_BASE_URL,
        grant_type: 'authorization_code',
      }),
      headers: getAuthHeaders(),
    }) 

    fetch(request)
      .then((res) => res.json())
      .then(res => {
        setAccessToken((oldValue) => res.access_token);
        setRefreshToken((oldValue) => res.refresh_token);
        window.localStorage.setItem("accessToken", res.access_token);
        window.localStorage.setItem("refreshToken", res.refresh_token);
        setItemExpires(res.expires_in);
        window.history.pushState({}, null, "/dashboard");
        getUserProfile(res.access_token, code);
      })
      .catch(() => {
        window.location = "/";
      });
  }, [setAccessToken, setRefreshToken, getUserProfile]);

  useEffect(() => {
    let accessToken = window.localStorage.getItem("accessToken");
    let refreshToken = window.localStorage.getItem("refreshToken");
    if (accessToken) {
      setAccessToken((oldValue) => accessToken);
    }
    if (refreshToken) {
      setRefreshToken((oldValue) => refreshToken);
    }
  }, []);

  useEffect(() => {
    if (code && state) {
      spotifyLogin(code);
    }
  }, [code, state, spotifyLogin]);

  useEffect(() => {
    if (!refreshToken) return

    getRefreshToken();

    const interval = setInterval(() => {
      getRefreshToken();
    }, (30) * 1000);

    return () => clearInterval(interval)
  }, [refreshToken, getRefreshToken]);

  return accessToken
}