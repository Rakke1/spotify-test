import { useCallback, useEffect, useState } from 'react'
import { SPOTIFY_API_BASE_URL } from '../constants';
import { getUserHeaders } from './useAuth';

export default function useSpotify({accessToken}) {
  const [newReleases, setNewReleases] = useState();
  const [feturedPlaylists, setFeaturedPlaylists] = useState();
  const [categories, setCategories] = useState();

  const fetchNewReleases = useCallback(() => {
    const url = new URL(`${SPOTIFY_API_BASE_URL}/browse/new-releases?country=US`);
    const request = new Request(url, {
      method: 'GET',
      headers: getUserHeaders(accessToken),
    }) 

    fetch(request)
    .then((res) => res.json())
    .then(res => {
      setNewReleases(() => res.albums.items)
    })
    .catch((err) => {
      console.error(err);
    })
  }, [accessToken]);


  const fetchFeaturedPlaylists = useCallback(() => {
    const url = new URL(`${SPOTIFY_API_BASE_URL}/browse/featured-playlists?country=US`);
    const request = new Request(url, {
      method: 'GET',
      headers: getUserHeaders(accessToken),
    }) 

    fetch(request)
    .then((res) => res.json())
    .then(res => {
      setFeaturedPlaylists(() => res.playlists.items)
    })
    .catch((err) => {
      console.error(err);
    })
  }, [accessToken]);

  const fetchFeaturedCategories = useCallback(() => {
    const url = new URL(`${SPOTIFY_API_BASE_URL}/browse/categories?country=US`);
    const request = new Request(url, {
      method: 'GET',
      headers: getUserHeaders(accessToken),
    }) 

    fetch(request)
    .then((res) => res.json())
    .then(res => {
      setCategories(() => res.categories.items)
    })
    .catch((err) => {
      console.error(err);
    })
  }, [accessToken]);

  useEffect(() => {
    fetchNewReleases();
    fetchFeaturedPlaylists();
    fetchFeaturedCategories();
  }, [fetchNewReleases, fetchFeaturedPlaylists, fetchFeaturedCategories]);

  return [newReleases, feturedPlaylists, categories];
}