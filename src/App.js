
import React from 'react';
import TweetsMainPage from './Components/TweetsMainPage';
import ProfilePage from './Components/ProfilePage';
import NavBar from './Components/NavBar';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AppContext from './AppContext';
import { getTweets } from './lib/Api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'David',
      tweets: [],
    }
  }

  componentWillMount() {
    const savedName = localStorage.getItem('savedName');
    const heldName = JSON.parse(savedName);
    if (savedName) {
      this.setState(() => ({ userName: heldName }))
    } else {
      this.setState(() => ({ userName: this.state.userName }))
    }
  }

  componentDidUpdate() {
    const local = this.state.userName;
    localStorage.setItem('savedName', JSON.stringify(local))
  }

  componentDidMount = () => {
    this.loadTweets();
    this.interval = setInterval(this.loadTweets, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  loadTweets = async () => {
    const response = await getTweets();
    this.setState(
      {
        tweets: response.data.tweets
      }
    )
  }


  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route path="/" exact>
              <AppContext.Provider value={{
                userName: this.state.userName,
                tweets: this.state.tweets,
                handleOnTweetSubmit: (value) => {
                  this.setState({ tweets: [value, ...this.state.tweets] })
                  this.loadTweets()
                }
              }}>
                <TweetsMainPage />
              </AppContext.Provider>
            </Route>
            <Route path="/profile" exact>
              <AppContext.Provider value={{
                userName: this.state.userName,
                currentUserName: (newName) => this.setState({ userName: newName })
              }}>
                <ProfilePage />
              </AppContext.Provider>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
