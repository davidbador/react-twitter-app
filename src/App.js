
import React from 'react';
import TweetsMainPage from './Components/TweetsMainPage';
import ProfilePage from './Components/ProfilePage';
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AppContext from './AppContext';
import firebase from './Firestore'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      userName: '',
      tweets: []
    }
  }

  unsubscribe = null;

  componentWillMount() {
    const savedName = localStorage.getItem('savedName');
    const heldName = JSON.parse(savedName);
    savedName ? (this.setState(() => ({ userName: heldName }))) : (this.setState(() => ({ userName: this.state.userName })))
  }

  componentDidUpdate() {
    localStorage.setItem('savedName', JSON.stringify(this.state.userName))
  }

  componentDidMount = () => {
    this.authListener();
    firebase.auth().onAuthStateChanged(userAuth => {
      this.setState({ user: userAuth })
    })
    this.loadTweets();
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      user ? (this.setState({ user })) : (this.setState({ user: null }))
    })
  }

  loadTweets = () => {
    firebase.firestore().collection('tweets').onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => doc.data());
      this.setState(
        {
          tweets: data
        }
      )
    })
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          {this.state.user && Object.keys(this.state.user).length > 0 && <NavBar />}
          <Switch>
            <AppContext.Provider value={{
              userName: this.state.userName || this.state.user.displayName,
              tweets: this.state.tweets,
              handleOnTweetSubmit: (value) => {
                this.setState({ tweets: [value, ...this.state.tweets] })
                this.loadTweets()
              },
              currentUserName: (newName) => {
                this.setState({ userName: newName })
              },
              user: this.state.user
            }}>
              <Route path="/" exact>
                {this.state.user && Object.keys(this.state.user).length > 0 ? (<TweetsMainPage />) : (<Login />)}
              </Route>
              <Route path="/profile" exact>
                {this.state.user && Object.keys(this.state.user).length > 0 ? (<ProfilePage />) : (<Login />)}
              </Route>
            </AppContext.Provider>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
