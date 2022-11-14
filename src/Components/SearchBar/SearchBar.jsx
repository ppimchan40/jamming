import React, { Component } from 'react';
import './SearchBar.css'
export class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.search=this.search.bind(this)
    this.handleTermChange=this.handleTermChange.bind(this)
    this.state = {searchTerm: ""}
  }

  search() {
    this.props.onSearch(this.state.searchTerm)
  }

  handleTermChange(event) {
    this.setState({searchTerm:event.target.value})
  }
  render() {
    return (
      <div className='SearchBar'>
        <input placeholder='Enter A Song, Album, or Artist'  value={this.state.searchTerm} onChange={this.handleTermChange}/>
        <button className='SearchButton' onClick={this.search}>SEARCH</button>
      </div>
    );
  }
}

export default SearchBar;
