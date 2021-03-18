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

  handleChangeType = (event) => {
    this.setState({
      filters: {...this.state.filters, type: event.target.value}
    })
    
  }

  handleFindPetsClicked = () => {
  
  let url = `/api/pets`
  if(this.state.filters.type !== 'all'){
    url += `?type=${this.state.filters.type}`
  }

    fetch(url)
    .then(r => r.json())
    .then(data => {
      this.setState({pets: data})
    })
  }

  handleAdoptPet = petId => {
    const pets = this.state.pets.map(pet => {
      return pet.id === petId ? { ...pet, isAdopted: true } : pet;
    });
    this.setState({ pets: pets });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPetsClick={this.handleFindPetsClicked} onChangeType={this.handleChangeType}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.handleAdoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
