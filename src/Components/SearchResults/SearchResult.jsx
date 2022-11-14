import React, { Component } from 'react';
import TrackList from '../TrackList/TrackList';
import './SearchResult.css'
export class SearchResult extends Component {
 
  render() {

    const {searchListTrack,onAdd} = this.props
    return (
      <div className='SearchResults'>
        <h2>Results</h2>
        <TrackList list={searchListTrack} onAdd={onAdd} isRemoval={false}/>
      </div>
    );
  }
}

export default SearchResult;
