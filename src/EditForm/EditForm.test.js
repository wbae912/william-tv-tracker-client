import React from 'react';
import { shallow } from 'enzyme';
import EditForm from './EditForm';
import toJson from 'enzyme-to-json';
import Context from '../Context';
import renderer from 'react-test-renderer';

describe(`EditForm component`, () => {
  const updateTvShow = (updatedShow) => {
    const newShows = this.state.shows.map(show => 
      (show.id === updatedShow.id)
        ? updatedShow
        : show
      );
      this.setState({
        shows: newShows
      })
    }
  
    const match = {
      params: {
        id: 1
      }
    }

  it('renders an .EditForm by default', () => {
    const wrapper = shallow(<Context.Provider value={updateTvShow}><EditForm match={match}/></Context.Provider>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('renders UI as expected', () => { 
    const tree = renderer
      .create(<Context.Provider value={updateTvShow} ><EditForm match={match}/></Context.Provider>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  })
});