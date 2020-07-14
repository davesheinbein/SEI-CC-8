import React, {Component} from 'react';
import './App.css';
import {Route, NavLink} from 'react-router-dom';
// The following imports all named exports attached to puppyAPI
import * as puppyAPI from '../../services/puppies-api';
import PuppyListPage from '../../pages/PuppyListPage/PuppyListPage';
import AddPuppyPage from '../../pages/AddPuppyPage/AddPuppyPage';
import PuppyDetailPage from '../../pages/PuppyDetailPage/PuppyDetailPage';
import EditPuppyPage from '../../pages/EditPuppyPage/EditPuppyPage';

class App extends Component {
  state = {
    puppies: []
  };

  handleAddPuppy = async newPupData => {
    const newPup = await puppyAPI.create(newPupData);
    this.setState(state => ({
      puppies: [...state.puppies, newPup]
    }),
    // Using cb to wait for state to update before rerouting
    () => this.props.history.push('/'));
  }

  handleUpdatePuppy = async updatedPupData => {
    const updatedPuppy = await puppyAPI.update(updatedPupData);
    // Using map to replace just the puppy that was updated
    const newPuppiesArray = this.state.puppies.map(p => 
      p._id === updatedPuppy._id ? updatedPuppy : p
    );
    this.setState(
      {puppies: newPuppiesArray},
      // This cb function runs after state is updated
      () => this.props.history.push('/')
    );
  }

  handleDeletePuppy= async id => {
    await puppyAPI.deleteOne(id);
    this.setState(state => ({
      // Yay, filter returns a NEW array
      puppies: state.puppies.filter(p => p._id !== id)
    }), () => this.props.history.push('/'));
  }

  /*--- Lifecycle Methods ---*/

  async componentDidMount() {
    const puppies = await puppyAPI.getAll();
    this.setState({puppies});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          React Puppies CRUD
          <nav>
            <NavLink exact to='/'>PUPPIES LIST</NavLink>
            &nbsp;&nbsp;&nbsp;
            <NavLink exact to='/add'>ADD PUPPY</NavLink>
          </nav>
        </header>
        <main>
          <Route exact path='/' render={() => 
            <PuppyListPage
              puppies={this.state.puppies}
              handleDeletePuppy={this.handleDeletePuppy}
            />
          } />
          <Route exact path='/add' render={() => 
            <AddPuppyPage
              handleAddPuppy={this.handleAddPuppy}
            />
          } />
          <Route exact path='/details' render={({location}) => 
            <PuppyDetailPage location={location}/>
          } />
          <Route exact path='/edit' render={({location}) => 
            <EditPuppyPage
              handleUpdatePuppy={this.handleUpdatePuppy}
              location={location}
            />
          } />
        </main>
      </div>
    );
  }
}

export default App;
