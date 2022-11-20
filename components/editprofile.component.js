import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { toast } from 'react-toastify';
import { withRouter } from '../common/with-router';
import UserService from "../services/user.service";
import Button from 'react-bootstrap/Button';
import { Image } from "react-bootstrap";
class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: { username: "" },
            userProfile: {},
            selectedImage: null,
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true }, () => {this.getUserDetail()});
    }

    getUserDetail = () => {
        UserService.getSelfProfileContent().then(
            (response) => {
                console.log(response.data)
                this.setState({
                    userProfile: response.data
                })
                console.log(this.state.userProfile)
            },
            (error) => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString(),
                });
            }
        );
    }

    publishPost = () => {
        if (this.state.textInput.length === 0) {
            toast.error("Please enter text");
            return;
        }
        UserService.publishPost(this.state.textInput, this.state.visibilityInput, this.state.selectedImage).then(
            (response) => {
                console.log(response);
                this.setState({ textInput: "" });
                this.props.pass.current.fetchContent();
            },
            (error) => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString(),
                });
                console.log(error)
            }
        )
    }
    
    selfProfile = () => {
        const { currentUser } = this.state;
        console.log(currentUser);
        return (
            <>
                <header className="jumbotron">
                <h3>
                        <strong>{currentUser.username}</strong> Profile
                    </h3>
                    <h6> Current Profile Image</h6>
                    <Image src={currentUser.images || "https://ssl.gstatic.com/accounts/ui/avatar_2x.png"} className="profile-img"/>
                    <h6> Change Profile Image</h6>
                    <this.UploadAndDisplayImage />
                    <br />
                    <Button variant="outline-primary" onClick={this.checkLogin} >Change Profile Picture</Button>
                </header>
                
            </>)
    }

    UploadAndDisplayImage = () => {
        return (
            <>
                {this.state.selectedImage && (
                    <>
                        <img alt="not found" width={"100px"} src={URL.createObjectURL(this.state.selectedImage)} className="profile-img"/>
                        <br />
                        <button onClick={() => this.setState({ selectedImage: null })}>Remove</button>
                    </>
                )}
                <br />

                <br />
                <input
                    type="file"
                    name="myImage"
                    onChange={(event) => {
                        console.log(event.target.files[0]);
                        this.setState({ selectedImage: event.target.files[0] });
                    }}
                />
            </>
        );
    };

    render() {
        if (this.state.redirect) {
            toast.error("You need to login to view that page")
            return <Navigate to={this.state.redirect} />
        }



        return (
            < className="container">
                {(this.state.userReady) ?
                    <>
                        {this.selfProfile()}

                    </>
                    : null}
            </>
        );
    }
}
export default withRouter(Profile);
