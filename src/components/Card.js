import React from 'react'

const Card = ({ details }) => {

    //Formatage avant rendu des ingrédients et instructions
    //On retire les ',' ou les '\n' avec .split, puis on renvoie une li sur chaque ingrédient
    const ingredients = details.ingredients
        .split(',')
        .map(item => <li key={item}>{item}</li>)

    const instructions = details.instructions
        .split('\n')
        .map(item => <li key={item}>{item}</li>)

    //Gestion d'une erreur au chargement d'une image
    //Si l'image n'existe pas (try), on renvoie une image par défaut (catch)
    const requireImage = chemin => {
        try {
            return require(`../img/${chemin}`)
        } catch (err) {
            return require(`../img/default.jpeg`)
        }
    } 

    return (
        <div className='card'>
            <div className='image'>
                <img src={requireImage(details.image)} alt={details.nom}></img>
            </div>
            <div className='recette'>
                <h2>{details.nom}</h2>
                <ul className='liste-ingredients'>
                    {ingredients}
                </ul>
                <ol className='liste-instructions'>
                    {instructions}
                </ol>
            </div>
        </div>
    )
}

export default Card