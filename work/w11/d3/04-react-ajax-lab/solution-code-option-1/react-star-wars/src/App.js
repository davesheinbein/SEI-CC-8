import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import { getAllStarships } from './services/sw-api';
import StarshipPage from './pages/StarshipPage/StarshipPage';

class App extends Component {
  
  state = {
    starships: []
  };

  getStarship = (idx) => {
    return this.state.starships[idx];
  }

  async componentDidMount() {
    const starships = await getAllStarships();
    this.setState({ starships: starships.results });
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">STAR WARS STARSHIPS</header>
        <Switch>
          <Route exact path='/' render={() => 
            <section>
              {this.state.starships.map(starship => 
                <Link
                  to={{
                    pathname: '/starships',
                    state: starship
                  }}
                  key={starship.name}
                >
                  {starship.name}
                </Link>
              )}
            </section>
          }/>
          <Route path='/starships' render={({location}) => 
            <StarshipPage
              location={location}
            />
          }/>
        </Switch>
      </div>
    );
  }

}

export default App;
