import firebase from 'firebase';
//import firestore from 'firebase/firestore'

//const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyDm4TgAWBPzBHy6UGlza8RKR85Fl9arU9Q",
  authDomain: "friendsup-215613.firebaseapp.com",
  databaseURL: "https://friendsup-215613.firebaseio.com",
  projectId: "friendsup-215613",
  storageBucket: "friendsup-215613.appspot.com",
  messagingSenderId: "759389831238"
};
firebase.initializeApp(config);

//firebase.firestore().settings(settings);

export default firebase;