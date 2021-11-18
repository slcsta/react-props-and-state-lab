import React from 'react'
import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  fetchPets = () => {
    let url = '/api/pets';
      if (this.state.filters.type !== 'all') {
        url += `?type=${this.state.filters.type}`
      }
  
      fetch(url)
        .then(response => response.json())
        .then(pets => this.setState({ pets: pets }));
  }
  


  // then we create a function up here called onChangeType
  // no event handlers right now
  handleChangeFilterType = (e) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: e.target.value
      }
    })

  }
  // when the filters component calls onFindPetsClick should fetch list of
  // pets using fetch - when we fetch we want to change the state of this
  // use filter type to fetch pets and put them into the pets array
  // call this base url if type is all but call api with a query parameter 
  //if the type is not all, but instead one of the animal types
  
  onAdoptPet = (petId) => {
    const pets = this.state.pets.map(p => {
      return p.id === petId ? { ...p, isAdopted: true } : p;
    })
    this.setState({ pets: pets })
  }
  // told we need 2 callbacks for filters: onChangeType and onFindPetsClick
  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleChangeFilterType}
              onFindPetsClick={this.fetchPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// app should pass a callback prop onChangeType to <Filters />
// and this callback needs to update App's state
// because it's a callback we know it will be a function {}
// should have an onFindPetsClick callback prop

export default App
