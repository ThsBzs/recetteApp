import React, {Component} from 'react'

class AjouterRecette extends Component {
    state = {
        nom: '',
        image: '',
        ingredients: '',
        instructions: ''
    }

    //Gestion du handleChange sur les input
    handleChange = event => {
        //On récupère name et value depuis la target de l'event
        const {name, value} = event.target
        //Name est ici entre [] car fait référence à la variable, pas au state
        this.setState({ [name]: value })
    }

    //Gestion du submit du formulaire
    handleSubmit = event => {
        //Bloque le Default
        event.preventDefault()
        //Récupère le state
        const recette = {...this.state}
        //Renvoie la recette avec la méthode ajouterRecette
        this.props.ajouterRecette(recette)
        //Reset du formulaire après saisie
        //Pour chaque élément de l'objet recette, on efface
        Object.keys(recette).forEach( item => {
            recette[item] = '' 
        })
        this.setState({ ...recette})
    }

    render () {
        return (
            <div className='card'>
                <form className="admin-form ajouter-recette" onSubmit={this.handleSubmit}>
                    <input value={this.state.nom} onChange={this.handleChange} name='nom' type='text' placeholder='Nom de la recette'></input>
                    {/* &#39; correspond à l'apostrophe, on ne peut pas l'échapper en HTML/JSX */}
                    <input value={this.state.image} onChange={this.handleChange} name='image' type='text' placeholder="Chemin de l&#39;image"></input>
                    <textarea value={this.state.ingredients} onChange={this.handleChange} name='ingredients' rows='3' placeholder='Ingrédients, séparés par une virgule'></textarea>
                    <textarea value={this.state.instructions} onChange={this.handleChange} name='instructions' rows='15' placeholder='Instructions, séparées par la touche &#39;Entrée&#39;'></textarea>
                    <button type='submit'> + Ajouter une recette</button>
                </form>
            </div>
        )
    }
}

export default AjouterRecette