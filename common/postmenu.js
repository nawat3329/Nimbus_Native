import React, { Component } from "react";
import { View, TextInput, Button } from 'react-native';
import {Toast} from 'toastify-react-native'


import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textInput: "",
            visibilityInput: "Public",
            visibilityView: "Public",
            selectedImage: null,
        };
    }

    publishPost = () => {
        if (this.state.textInput.length === 0) {
            Toast.error("Please enter text");
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

    publishPostMenu = () => {
        return (
            <View >
                <TextInput placeholder="Write Something!" value={this.state.textInput} onChangeText={(event) => this.setState({ textInput: event })} />
                <Button variant="outline-secondary" onPress={this.publishPost} title="Publish" />
            </View>
        )
    }



    UploadAndDisplayImage = () => {
        return (
            <div>
                {this.state.selectedImage && (
                    <div>
                        <img alt="not found" width={"250px"} src={URL.createObjectURL(this.state.selectedImage)} />
                        <br />
                        <button onClick={() => this.setState({ selectedImage: null })}>Remove</button>
                    </div>
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
            </div>
        );
    };


    render() {
        return (
            <View className="container">
                <View className="bg-light p-5 rounded border">
                    <this.publishPostMenu />
                    {/* <this.UploadAndDisplayImage /> */}
                </View>
            </View>
        );
    }
}
