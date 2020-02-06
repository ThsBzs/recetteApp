import React, {Component} from 'react'
import AjouterRecette from './AjouterRecette'
import AdminForm from './AdminForm'
import Login from './Login'

//imports firebase pour l'authentification
import firebase from 'firebase/app'
import 'firebase/auth'
import base, { firebaseApp } from '../base'

class Admin extends Component {
    
    state={
        //Gestion de la connexion
        //De base uid et chef sont null
        uid: null,
        chef: null
    }

    //Persistence de la connexion lorsqu'elle est effective
    //Si user existe, on garde ses infos de connexion
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.handleAuth({user})
            }
        })
    }

    //Gestion de la connexion
    handleAuth = async authData => {
        const box = await base.fetch(this.props.pseudo, {context : this})
        //Si on ne se connecte pas avec facebook, on bascule un chef (pseudo) de base
        if(!box.chef){
            await base.post(`${this.props.pseudo}/chef`, {
                data: authData.user.uid
            })
        }
        //On renvoie l'uid une fois qu'il est passé
        this.setState({
            uid: authData.user.uid,
            chef: box.chef || authData.user.uid
        })
    }

    //Méthodes de connexion fournies par Firebase
    authenticate = () => {
        const authProvider = new firebase.auth.FacebookAuthProvider()
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.handleAuth)
    }

    //Gestion de la déconnexion
    logout = async () => {
        await firebase.auth().signOut()
        this.setState({uid: null})
    }

    render() {
        const {recettes, ajouterRecette, majRecette, supprimerRecette, chargerExemple} = this.props

        const logout = <button onClick={this.logout}>Déconnexion</button>

        //Si l'utilisateur n'est pas loggé
        if (!this.state.uid){
            return <Login authenticate={this.authenticate}></Login>
        }

        //Si l'utilisateur n'est pas l'auteur
        if (this.state.uid !== this.state.chef) {
            return (
                <div>
                    <p>Vous n'êtes pas le chef de cette boîte, désolé
                    </p>
                    {logout}
                </div>
            )
        }

        return(
            <div className='cards'>
                <AjouterRecette ajouterRecette={ajouterRecette} />
                {
                    //Gestion de la modification des recettes
                    Object.keys(recettes)
                        .map(key => <AdminForm
                        key={key}
                        id={key}
                        majRecette={majRecette}
                        supprimerRecette={supprimerRecette}
                        recettes={recettes}></AdminForm>)
                }
                <footer>
                    {logout}
                    <button onClick={chargerExemple}>Remplir</button>
                </footer>
            </div>
        )
    }
}

export default Admin