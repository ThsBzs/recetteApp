import React from 'react'

const AdminForm = ({id: key, majRecette, supprimerRecette, recettes}) => {//id: key permet de modifier le nom d'id 

    //Récupération du focus avec la key
    const recette = recettes[key]

    //Gestion du handleChange
    const handleChange = (event, key) => {
        //Ciblage précis des champs concernés
        const {name, value} = event.target
        //Récupération de l'id de la recette à modifier
        //On crée en fait une copie de l'élément pour le modifier
        const recette = recettes[key]
        //Attribution des nouvelles info
        recette[name] = value
        majRecette(key, recette)
    }

    return (
        <div className='card'>
            <form className='admin-form'>
                <input value={recette.nom} onChange={e => handleChange(e, key)} type='text' name='nom' placeholder='Nom de la recette' />
                <input value={recette.image} onChange={e => handleChange(e, key)} type='text' name='image' placeholder='Chemin de l&#39;image' />
                <textarea value={recette.ingredients} onChange={e => handleChange(e, key)} name='ingredients' rows='3' placeholder='Liste des ingrédients'/>
                <textarea value={recette.instructions} onChange={e => handleChange(e, key)} name='instructions' rows='3' placeholder='Liste des instructions'/>
            </form>
            <button onClick={() => supprimerRecette(key)}>Supprimer</button>
        </div>
    )
}

export default AdminForm   