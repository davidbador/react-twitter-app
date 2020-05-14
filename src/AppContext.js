import React from 'react';

const AppContext = React.createContext({
    user: {},
    userName: '',
    tweets: [],
    currentUserName: (newName) => { },
    handleOnTweetSubmit: (value) => { }
})

export default AppContext
