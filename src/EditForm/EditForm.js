import React, { Component } from 'react';
import tvContext from '../Context';
import TokenService from '../services/token-service';
import FormError from '../FormError/FormError';
import './EditForm.css';

export default class EditForm extends Component {
  static contextType = tvContext;

  constructor(props) {
    super(props)
  
    this.state = {
      id: '',
      tv_title: '',
      status: '',
      season_number: '',
      episode_number: '',
      rating: '',
      genre: '',
      description: '',
      review: '',
      user_id: '',
      titleTouch: {
        touched: false
      },
      statusTouch: {
        touched: false
      },
      seasonTouch: {
        touched: false
      },
      episodeTouch: {
        touched: false
      },
      error: null
    }
  }

  componentDidMount() {
    const tvId = Number(this.props.match.params.id);
    fetch(`https://whispering-brook-43228.herokuapp.com/api/shows/all/${tvId}`, {
      method: 'GET',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res => {
      if(!res.ok) {
        return res.json().then(err => Promise.reject(err));
      }
      return res.json();
    })
    .then(data => {
      this.setState({
        id: data.id,
        tv_title: data.tv_title,
        status: data.status,
        season_number: data.season_number,
        episode_number: data.episode_number,
        rating: data.rating,
        genre: data.genre,
        description: data.description,
        review: data.review,
        user_id: data.user_id
      })
    })
    .catch(res => {
      this.setState({
        error: res.error
      })
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleTitleTouch = (e) => {
    this.setState({
      titleTouch: {touched: true}
    })
  }

  handleStatusTouch = (e) => {
    this.setState({
      statusTouch: {touched: true}
    })
  }

  handleSeasonTouch = (e) => {
    this.setState({
      seasonTouch: {touched: true}
    })
  }

  handleEpisodeTouch = (e) => {
    this.setState({
      episodeTouch: {touched: true}
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newShowFields = {
      id: this.state.id,
      tv_title: e.target.tv_title.value,
      status: e.target.status.value,
      season_number: Number(e.target.season_number.value),
      episode_number: Number(e.target.episode_number.value),
      rating: e.target.rating.value,
      genre: e.target.genre.value,
      description: e.target.description.value,
      review: e.target.review.value,
      user_id: this.state.user_id
    };

    const tvId = Number(this.props.match.params.id);
    fetch(`https://whispering-brook-43228.herokuapp.com/api/shows/all/${tvId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(newShowFields)
    })
    .then(res => {
      if(!res.ok) {
        return res.json().then(err => Promise.reject(err));
      }
    })
    .then(() => {
      this.context.updateTvShow(newShowFields);
      this.props.history.goBack();
    })
    .catch(res => {
      this.setState({
        error: res.error
      })
    })
  }

  validateTitle = () => {
    const title = this.state.tv_title;
    if(title.length === 0) {
      return 'Please enter a TV show name';
    }
  }

  validateStatus = () => {
    const status = this.state.status;
    if(parseInt(status) === 0) {
      return 'Please enter a status';
    }
  }

  validateSeasonNumber = () => {
    const seasonNumber = this.state.season_number;
    if(seasonNumber <= 0 || seasonNumber % 1 !== 0) {
      return 'Please enter a whole number greater than 0';
    }
  }

  validateEpisodeNumber = () => {
    const episodeNumber = this.state.episode_number;
    if(episodeNumber <= 0 || episodeNumber % 1 !== 0) {
      return 'Please enter a whole number greater than 0';
    }
  }

  render() {
    const { tv_title, status, season_number, episode_number, rating, genre, description, review } = this.state;
    let titleError = this.validateTitle();
    let statusError = this.validateStatus();
    let seasonNumberError = this.validateSeasonNumber();
    let episodeNumberError = this.validateEpisodeNumber();

    return (
      <section className="edit-form-section" role="main">
        <div role="alert" className="error-form">
          {this.state.error && <p className='red-bigger'>{this.state.error}</p>}
        </div>
          <form className="edit-show-form" onSubmit={e => {
            this.handleSubmit(e);
            }}>
            <h1 className="edit-form-title">Edit TV Show</h1>
            <div className="form-section">
              <label htmlFor="tv_title" className="edit-form-label">TV Show Name<span className="required">*</span></label>
              <input type="text" name="tv_title" id="tv_title" value={tv_title} className="edit-form-input" required aria-required="true" aria-invalid="true"
                onChange={e => {this.handleChange(e); this.handleTitleTouch(e)}}
              />
              {this.state.titleTouch.touched && <FormError message={titleError} />}
            </div>
            <div className="form-section">
              <label htmlFor="status" className="edit-form-label">Status<span className="required">*</span></label>
              <select name="status" id="status" value={status} className="edit-form-select" required aria-required="true" aria-invalid="true"
                onChange={e => {this.handleChange(e); this.handleStatusTouch(e)}}
              >
                <option value="0">Select a Status...</option>
                <option value="Planning to Watch">Plan to Watch</option>
                <option value="Currently Watching">Currently Watching</option>
                <option value="Completed">Completed</option>
              </select>
              {this.state.statusTouch.touched && <FormError message={statusError} />}
            </div>
            <div className="form-section">
                <label htmlFor="season_number" className="edit-form-label">Season No.</label>
                <input type="number" name="season_number" id="season_number" value={season_number} min="1" className="edit-form-input"
                onChange={e => {this.handleChange(e); this.handleSeasonTouch(e)}} />
                {this.state.seasonTouch.touched && <FormError message={seasonNumberError} />}
            </div>
            <div className="form-section">
                <label htmlFor="episode_number" className="edit-form-label">Episode No.</label>
                <input type="number" name="episode_number" id="episode_number" value={episode_number} min="1" className="edit-form-input"
                onChange={e => {this.handleChange(e); this.handleEpisodeTouch(e);}} />
                {this.state.episodeTouch.touched && <FormError message={episodeNumberError} />}
            </div>
            <div className="form-section">
                <label htmlFor="rating" className="edit-form-label">Rating</label>
                <select name="rating" id="rating" value={rating} className="edit-form-select"
                onChange={e => this.handleChange(e)}>
                  <option value="">Select a Rating...</option>
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>
              <div className="form-section">
                  <label htmlFor="genre" className="edit-form-label">Genre</label>
                  <select name="genre" id="genre" value={genre} className="edit-form-select"
                  onChange={e => this.handleChange(e)}>
                    <option value="N/A">Select a Genre...</option>
                    <option value="Action">Action</option>
                    <option value="Animated">Animated</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Documentary">Documentary</option>
                    <option value="Drama">Drama</option>
                    <option value="Educational">Educational</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Horror">Horror</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Reality">Reality</option>
                    <option value="Sitcom">Sitcom</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Variety">Variety</option>
                  </select>
                </div>
              <div className="form-section">
                  <label htmlFor="description" className="edit-form-label">Description</label>
                  <textarea type="text" name="description" id="description" value={description} className="edit-form-input"
                  onChange={e => this.handleChange(e)} />
              </div>
              <div className="form-section">
                    <label htmlFor="review" className="edit-form-label">Review</label>
                    <textarea type="text" name="review" id="review" value={review} className="edit-form-input"
                    onChange={e => this.handleChange(e)} />
              </div>
              <p className="required-p"><span className="required">*</span>Required Fields</p>
              <div className="form-buttons-div">
                <button type="submit" className="edit-show-button" disabled={titleError || statusError || seasonNumberError || episodeNumberError}>Submit</button>
                <button type="button" className="cancel-button" onClick={() => this.props.history.goBack()}>Cancel</button>
              </div>
            </form>
        </section>
    )
  }
}