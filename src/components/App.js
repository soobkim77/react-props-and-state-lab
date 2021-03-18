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
  
  let url = `/api/pets?type=${this.state.filters.type}`

    fetch(url)
    .then(r => r.json())
    .then(data => {
      this.setState({pets: data})
    })
  }

  handleAdoptPet = (event) => {
    let par = event.target.parentElement
    let btn = par.querySelectorAll("button")
    console.log(btn)
    btn[0].className = "ui primary button"
    btn[1].className = "ui disabled button"
      // this.state.pets.find(pet => pet.id == id)
  }

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
