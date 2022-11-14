import React, { Component } from 'react'
import Track from '../Track/Track'
import './TrackList.css'
export class TrackList extends Component {

  render() { 
    const {list,onAdd,isRemoval,onRemove} = this.props
 
     return (
      <div className="TrackList">
       {list.map((track)=> <Track key={track.id} track={track} onAdd={onAdd} onRemove={onRemove} isRemoval={isRemoval}/>)}
  </div>
    )
  }
}

export default TrackList