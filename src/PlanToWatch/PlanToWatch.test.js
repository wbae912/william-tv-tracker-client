import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import PlanToWatch from './PlanToWatch';
import Context from '../Context';
import TokenService from '../services/token-service';

describe.only(`PlanToWatch component`, () => {
  const props = {
    show:
      {
        "id": "1",
        "tv_title": "Example",
        "status": "PlanToWatch",
        "season_number": "1",
        "episode_number": "1",
        "rating": "3",
        "genre": "Action",
        "description": "Lorem ipsum",
        "review": "Lorem ipsum"
      },
    key: "1"
  }

  const shows = [
      {
        "id": "1",
        "tv_title": "Example",
        "status": "PlanToWatch",
        "season_number": "1",
        "episode_number": "1",
        "rating": "3",
        "genre": "Action",
        "description": "Lorem ipsum",
        "review": "Lorem ipsum"
      },
      {
        "id": "2",
        "tv_title": "Example 2",
        "status": "PlanToWatch",
        "season_number": "1",
        "episode_number": "1",
        "rating": "3",
        "genre": "Action",
        "description": "Lorem ipsum",
        "review": "Lorem ipsum"
      }
    ];
  
  const getAllShows = () => {
    return fetch(`http://localhost:8000/api/shows/all`, {
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
        shows: data,
        isLoggedIn: true
      })
    })
  }
  
  it('renders component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <Context.Provider value={{getAllShows, shows}}><PlanToWatch /></Context.Provider>
      </MemoryRouter>
      , div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders UI as expected', () => {
    const tree = renderer
      .create(<MemoryRouter><Context.Provider value={{getAllShows, shows}}><PlanToWatch /></Context.Provider></MemoryRouter>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  })
  it('renders a .PlanToWatch by default', () => {
    const wrapper = shallow(<Context.Provider value={{shows}}><PlanToWatch /></Context.Provider>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('renders a Show in section for each notes in array', () => {
    const section = shallow(<Context.Provider value={(shows)}><PlanToWatch {...props} /></Context.Provider>)
      .find('section')
    expect(toJson(section)).toMatchSnapshot()
  })
})