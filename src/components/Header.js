import React from 'react'

const Header = ({pseudo}) => {
    //Formatage du pseudo si celui-ci commence par une voyelle
    //Utilise une regex sur la première lettre du pseudo
    const formatPseudo = pseudo => /[aeiouy]/i.test(pseudo[0]) ? `d'${pseudo}` : `de ${pseudo}`

    return (
        <header>
            <h1>La boîte à recettes {formatPseudo(pseudo)}</h1>
        </header>
    )
}

export default Header