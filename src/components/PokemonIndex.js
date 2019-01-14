import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'
const URL = 'http://localhost:3000/pokemon'

class PokemonPage extends React.Component {
  constructor() {
    super()
    this.state = {
      pokemon: [],
      query: ''
    }
  }

  handleSearch = e => {

    this.setState({
      query: e.target.value
    })

    let filteredPokemon = [...this.state.pokemon]
    let result = filteredPokemon.filter(pokemon =>
      pokemon.name.includes(e.target.value)
    )
    this.setState({ pokemon: result })
    if (this.state.query.length > e.target.value.length) {
      this.fetchPokemon()
    }
  }

  componentDidMount() {
    this.fetchPokemon()
  }

  fetchPokemon = () => {
    fetch(URL)
      .then(res => res.json())
      .then(pokemonCollection =>
        this.setState({
          pokemon: pokemonCollection,
        })
      )
  }

  addNewPokemon = (newPokemonObject) => {
    let result = this.setState({
        pokemon: [...this.state.pokemon, newPokemonObject]
    })

    fetch(URL, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(
        result
      )
    })
  }

  render() {
    console.log('this is the state of pokemon', this.state.pokemon)
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={this.handleSearch} showNoResults={false} />
        <br />
        <PokemonCollection pokemon={this.state.pokemon} />
        <br />
        <PokemonForm addNewPokemon={this.addNewPokemon}/>
      </div>
    )
  }
}

export default PokemonPage
