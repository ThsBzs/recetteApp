import React, { Component } from 'react'
// CSS
import './App.css'

import Header from './components/Header'
import Admin from './components/Admin'
import Card from './components/Card'
import recettes from './recettes'

//Import Firebase
import base from './base'

class App extends Component {
  state = {
    pseudo: this.props.match.params.pseudo,
    //récupération des recettes
    recettes : {}
  }

  //Récupération et mise à jour des éléments de la BDD
  //this.ref permet ensuite de déconnecter lors du changement d'utilisateur
  componentDidMount(){
    this.ref = base.syncState(`/${this.state.pseudo}/recettes`, {
      context: this,
      state: 'recettes'
    })
  }
  //Cette partie permet de déconnecter la BDD à la fin du montage
  componentWillUnmount () {
    base.removeBinding(this.ref)
  }

  //Méthode d'ajout des recettes
  ajouterRecette = recette => {
    //Récupération du state de base
    const recettes = {...this.state.recettes}
    //Ajout des Date.now pour la clé
    recettes[`recette-${Date.now()}`] = recette
    this.setState({recettes})
  }

  //Méthode de modification des recettes
  majRecette = (key, newRecette) => {
    //Récupération du state de base
    const recettes = {...this.state.recettes}
    //Récupération et modification de la recette avec sa clé
    recettes[key] = newRecette
    this.setState({ recettes })
  }

  //Méthode de suppression
  supprimerRecette = key => {
    //Récupération du state
    const recettes = {...this.state.recettes}
    //Suppression de la recette
    recettes[key] = null
    this.setState({recettes})
  }

  //Remplit les cartes avec les recettes de base
  chargerExemple = () => this.setState({recettes})

  render () {
    //gestion des différentes recettes
    const cards = Object
                    .keys(this.state.recettes)
                    .map(key => <Card key={key} details={this.state.recettes[key]}></Card>)

    return (
      <div className='box'>
        <Header pseudo={this.state.pseudo} />
        <div className='cards'>
          {cards}
        </div>
        <Admin 
        pseudo={this.state.pseudo}
        recettes={this.state.recettes}
        ajouterRecette={this.ajouterRecette}
        majRecette={this.majRecette}
        supprimerRecette={this.supprimerRecette}
        chargerExemple={this.chargerExemple}>
        </Admin>
      </div>
    )
  }
}

export default App
