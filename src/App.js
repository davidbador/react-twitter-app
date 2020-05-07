import React from 'react';
import TweetsMainPage from './Components/TweetsMainPage';
import ProfilePage from './Components/ProfilePage';
import NavBar from './Components/NavBar';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'david',
    }
    this.currentUserName = this.currentUserName.bind(this)
  }

  currentUserName = (newName) => {
    this.setState({ userName: newName })
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route path="/" exact>
              <TweetsMainPage currentUserName={this.state.userName} />
            </Route>
            <Route path="/profile" exact>
              <ProfilePage updatedUserName={this.currentUserName} />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
