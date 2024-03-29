import React, { Component } from 'react';
import tvContext from '../Context';
import PropTypes from 'prop-types';
import './TvShowEntry.css';

export default class TvShowEntry extends Component {
  static contextType = tvContext;

  constructor(props) {
    super(props)
  
    this.state = {
       touched: false,
       editHovered: false,
       deleteHovered: false
    }
  }
  
  toggleTouched = (e) => {
    this.setState({
      touched: !this.state.touched
    })
  }

  toggleEditHovered = (e) => {
    this.setState({
      editHovered: true
    })
  }

  toggleDeleteHovered = (e) => {
    this.setState({
      deleteHovered: true
    })
  }

  mouseOutEdit = (e) => {
    this.setState({
      editHovered: false
    })
  }

  mouseOutDelete = (e) => {
    this.setState({
      deleteHovered: false
    })
  }
  
  render() {
    let rating = this.props.show.rating;
    if(rating === 0) {
      rating = 
      <>
        <span className="not-rated">Not Rated</span>
      </>
    }
    if(rating === 1) {
      rating =
      <>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
      </>
    }
    if(rating === 2) {
      rating =
      <>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
      </>
    }
    if(rating === 3) {
      rating =
      <>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
      </>
    }
    if(rating === 4) {
      rating =
      <>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star"></span>
      </>
    }
    if(rating === 5) {
      rating =
      <>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star checked"></span>
      </>
    }

    return (
      <li className="tv-show-entry" onClick={e => this.toggleTouched(e)}>
        <h2 className="entry-title" id="show-entry-h2">{this.props.show.tv_title}</h2>
        <div className="entry-div">
          <p className="entry-p">Season: {this.props.show.season_number}</p>
          <p className="entry-p">Episode: {this.props.show.episode_number}</p>
          <p className="entry-p">Genre: {this.props.show.genre}</p>
          <p className="entry-p entry-p-last">Rating: {rating}</p>
        </div>

        {this.state.touched
          ? (
            <div className="touched-p" aria-live="polite">
              <p className="entry-p" id="description-p">Description: {this.props.show.description}</p>
              <p className="entry-p" id="review-p">Review: {this.props.show.review}</p>
             </div>
            )
          : null
        }

        <div className="entry-buttons" aria-live="polite">
          <i className="fa fa-edit fa-lg edit-button" aria-label="Edit TV show button"
            onClick={() => this.props.history.push(`/edit-entry/${this.props.show.id}`)} 
            onMouseOver={this.toggleEditHovered}
            onMouseOut={this.mouseOutEdit}>
          </i>
          <i className="fa fa-trash fa-lg" aria-label="Delete TV show button"
            onClick={() => this.context.deleteTvShow(this.props.show.id)}
            onMouseOver={this.toggleDeleteHovered}
            onMouseOut={this.mouseOutDelete}>
          </i>
          {this.state.editHovered ? <p className="p-edit">Edit TV Show</p> : null}
          {this.state.deleteHovered ? <p className="p-delete">Delete TV Show</p> : null}
        </div>
      </li>
    )
  }
}

TvShowEntry.propTypes = {
  show: PropTypes.object
}