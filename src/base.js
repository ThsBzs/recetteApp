import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBTGhPZUjQnxtLyNO_AAYTXxcbAzu6mkqo",
  authDomain: "recettes-app-b78b9.firebaseapp.com",
  databaseURL: "https://recettes-app-b78b9.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database())

// This is a named export
export { firebaseApp }

// this is a default export
export default base
