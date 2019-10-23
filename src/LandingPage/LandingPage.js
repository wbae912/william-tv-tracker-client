import React, { Component } from 'react';
import './LandingPage.css';

export default class LandingPage extends Component {
  render() {
    return (
    <div className="landing-page">
      <main role="main">
        <header className="header">
          <h1 className="header-tag">Explore TV Tracker</h1>
          <div className="hero">     
            <h2 className="app-title-headline">Track and catalog your favorite TV shows...</h2>
          </div>
        </header>
          <div className="section-flex">
          <section className="section-one">
            <h2 className="section-h2">Add Your TV Shows</h2>
            <i className="fa fa-plus fa-2x"></i>
            <p className="section-p">Did a friend recommend you a good show to watch? Add it as an entry so you don't forget.</p>
          </section>

          <hr className="underline"></hr>

          <section className="section-two">
            <h2 className="section-h2">Track Your Shows</h2>
            <i className="fa fa-eye fa-2x"></i>
            <p className="section-p">Struggling to remember which episode you left off on? TV Tracker saves all your entries
            and organizes them into convenient lists. Take control by editing and deleting entries on your lists.</p>
          </section>

          <hr className="underline"></hr>

          <section className="section-three">
            <h2 className="section-h2">View Your Dashboard</h2>
            <i className="fa fa-list fa-2x"></i>
            <p className="section-p">Curious about how many shows you rated 5 stars? TV Tracker's built-in dashboard provides a quick snapshot 
              view of all the important metrics.</p>
          </section>
        </div>
      </main>
    </div>
    )
  }
}