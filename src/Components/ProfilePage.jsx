import React from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import '../App.css'

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newUserName: [],
        }
        this.button = React.createRef();
        this.updateUserName = this.updateUserName.bind(this);
        this.submitUserName = this.submitUserName.bind(this);
    }

    updateUserName = (event) => {
        this.setState({ newUserName: event.target.value })
    }

    submitUserName = (event) => {
        event.preventDefault()
        if (this.state.newUserName.length > 0) {
            this.setState({ newUserName: this.state });
            this.props.updatedUserName(this.state.newUserName)
        } else {
            alert('Please enter a User Name!');;
        }
    }

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                <Form style={{ position: 'relative' }} onSubmit={this.submitUserName}>
                    <FormGroup>
                        <div style={{ color: 'white', fontSize: '200%', textAlign: 'left', marginBottom: '5%' }}>
                            Profile
                        </div>
                        <div style={{ textAlign: 'left', color: 'white' }}>User Name</div>
                        <Input type="text" value={this.state.value} style={{ width: '700px' }} onChange={this.updateUserName} />
                        <Button type="submit" style={{ position: "absolute", right: 0 }} color="primary" innerRef={button => { this.button = button }}>Save</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default ProfilePage
