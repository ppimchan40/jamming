import React, { Component } from 'react';
import SearchResult from '../SearchResults/SearchResult';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import './App.css';
import Spotify from '../../util/Spotify';
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playListTrack: [],
      playListName: 'New-PlayList',
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  }

 
  addTrack(clickedTrack) {
    console.log(clickedTrack);
    console.log(this.state.playListTrack);
    let isInPlayList = this.state.playListTrack.findIndex((song) => song.id === clickedTrack.id);

    if (isInPlayList === -1) {
      this.setState({ playListTrack: [...this.state.playListTrack, clickedTrack] });
      return;
    }
  }

  removeTrack(clickedTrack) {
    const newTracks = this.state.playListTrack.filter((track) => track.id !== clickedTrack.id);
    this.setState({ playListTrack: newTracks });
  }

  updatePlaylistName(playListName) {
    this.setState({ playListName: playListName });
  }
  
  async savePlaylist() {
    console.log("savePlaylist Function")
  try {
    const trackURIs = this.state.playListTrack.map((track)=> track.uri)
    await Spotify.savePlayList(this.state.playListName,trackURIs)
    this.setState({playListTrack:[], playListName: 'New-PlayList',})
  } catch (error) {
      console.log(error)
  }
  }

  async search(term) {
    const searchResults = await Spotify.search(term)
    this.setState({searchResults:searchResults})
    console.log(searchResults)
  }

  componentDidMount() {
    Spotify.getAccessToken()
  }
  render() {
    return (
      <div>
        <h1>
          Ja<span className='highlight'>mmm</span>ing
        </h1>
        <div className='App'>
          <SearchBar onSearch={this.search} />
          {/* <a href="wwww.google.com">GG</a> */}
          <div className='App-playlist'>
            <SearchResult searchListTrack={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist
              playListName={this.state.playListName}
              playListTrack={this.state.playListTrack}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
