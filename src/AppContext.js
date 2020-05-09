import React from 'react';

const AppContext = React.createContext({
    userName: 'David',
    tweets: [],
    currentUserName: (newName) => { },
    handleOnTweetSubmit: (value) => { }
})

export default AppContext
