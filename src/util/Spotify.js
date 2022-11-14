const CLIENT_ID = 'c4a247d32255493ca3d6b0a0fbd1d6ba';
const REDIRECT_URI = 'http://localhost:3000';
const API_END_POINT = 'https://api.spotify.com/v1';

const Spotify = {
  removeToken() {
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('expired_time');
  },
  getAccessToken() {
    let accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      console.log('already have token');
      return accessToken;
    }

    const url = window.location.href;
    const tokenRegEx = /access_token=([^&]*)/;
    const expireRegEx = /expires_in=([^&]*)/;

    const token = url.match(tokenRegEx);
    const expire = url.match(expireRegEx);

    if (token && expire) {
      let access_token = token[1];
      let expire_time = expire[1];
      console.log(expire_time);
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('expired_time', expire_time);
      window.setTimeout(() => localStorage.removeItem('access_token'), +expire_time);
      window.setTimeout(() => localStorage.removeItem('expired_time'), +expire_time);
      // window.history.pushState('Access Token', null, '/');
      window.location.hash = '';
      // window.location.href.substr(0, window.location.href.indexOf('#'));
      return access_token;
    } else {
      console.log('case-3');
      const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}
      `;
      window.location = url;
    }
  },

  async search(TERM) {
    console.log(TERM);
    if (!TERM) {
      return [];
    }
    let accessToken = this.getAccessToken();
    const config = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await fetch(`${API_END_POINT}/search?type=track&q=${TERM}`, config);
      const jsonResponse = await response.json();

      const items = jsonResponse?.tracks?.items;
      if (items.length === 0) {
        return [];
      }
      const searchTrackList = items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));
      return searchTrackList;
    } catch (error) {
      console.log(error);
      this.removeToken();
    }
  },

  async savePlayList(playlistName, trackURIs) {
    if (!playlistName && !trackURIs.length == 0) {
      return;
    }
    try {
      let accessToken = this.getAccessToken();
      const configGetMe = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(`${API_END_POINT}/me`, configGetMe);
      const jsonResponse = await response.json();
      const userId = jsonResponse.id;
      console.log(userId);

      const configCreatePlayList = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name: playlistName }),
      };
      const responseSaveList = await fetch(
        `${API_END_POINT}/users/${userId}/playlists`,
        configCreatePlayList
      );

      const jsonPlayListResponse = await responseSaveList.json();
      console.log(jsonPlayListResponse);
      // return jsonResponse;

      const playListId = jsonPlayListResponse.id;
      const configAddTracksToPlayList = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ uris: trackURIs }),
      };

      const responseAddTrack = await fetch(
        `${API_END_POINT}/users/${userId}/playlists/${playListId}/tracks`,
        configAddTracksToPlayList
      );

      // const jsonResponseAddTrack = await responseAddTrack.json();
      console.log(responseAddTrack);
    } catch (error) {
      console.log(error);
      this.removeToken();
    }
  },
};

export default Spotify;
