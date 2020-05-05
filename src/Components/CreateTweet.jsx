// import React from 'react';
// import { Button, Input, FormGroup, Form } from 'reactstrap';

// class CreateTweet extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             tweets: [],
//             value: '',
//             id: 0,
//         };
//         this.button = React.createRef();
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(event) {
//         this.setState({ value: event.target.value })
//     }

//     handleSubmit(event) {
//         event.preventDefault();
//         if (this.state.value.length === 0) {
//             this.button.setAttribute('disabled', 'disabled');
//         } else if (this.state.value.length < 140) {
//             let newId = this.state.id
//             newId++;
//             let newTweet = { id: newId, name: 'david', message: this.state.value, date: new Date().toUTCString() }
//             let newTweets = [...this.state.tweets];
//             newTweets.push(newTweet)
//             this.setState({ tweets: newTweets, value: '', id: newId })
//             this.props.createTweet(this.state)
//         } else if (this.state.value.length > 140) {
//             this.button.setAttribute('disabled', 'disabled');
//         }
//         this.button.removeAttribute('disabled');
//     }

//     render() {
//         return (
//         )
//     }
// }

// export default CreateTweet
