import React, { Component } from 'react'
import TrackList from '../TrackList/TrackList'
import "./Playlist.css"
export class Playlist extends Component {

  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this)
   
  
  }

  handleNameChange (event)  {
    this.props.onNameChange(event.target.value)
  }
  render() {
    const {playListTrack,playListName,onRemove,onSave} = this.props

    return (
      <div className="Playlist">
      <input value={playListName} onChange={this.handleNameChange}/>
      <TrackList list={playListTrack} onRemove={onRemove} isRemoval={true}/>
      <button className="Playlist-save" onClick={onSave}>SAVE TO SPOTIFY</button>
    </div>
    )
  }
}

export default Playlist