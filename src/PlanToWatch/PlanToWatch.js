import React, { Component } from 'react';
import TvShowEntry from '../TvShowEntry/TvShowEntry';
import tvContext from '../Context';

export default class PlanToWatch extends Component {
  static contextType = tvContext;
  
  render() {
    const planningToWatchShows = this.context.shows.filter(show => show.status === 'Planning to Watch');
    return (
      <div>
        <header role="banner">
          <h1>Plan to Watch</h1>
         <br/>
          <label>Search TV Show</label>
          <input type="text"/>
          <button>Search</button>
          <select name="list-options" id="list-options">
              <option value="0">Filter By</option>
              <option value="1">Genre</option>
              <option value="1">Rating</option>
          </select>
          <select name="list-options" id="list-options">
              <option value="0">Sort By</option>
              <option value="1">Name</option>
              <option value="1">Rating</option>
          </select>
        </header>
       

        {planningToWatchShows.map(show => 
          <TvShowEntry
            key={show.id}
            show={show}
          />)}


        <section>
          <button>Add New TV Show</button>
        </section>
      </div>
    )
  }
}