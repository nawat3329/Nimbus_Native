import React, { Component } from "react";
import { View, TextInput, Button, Image, StyleSheet } from 'react-native';
import { Toast } from 'toastify-react-native'
import * as ImagePicker from 'expo-image-picker';


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
        Toast.info("Uploading...");
        UserService.publishPost(this.state.textInput, this.state.visibilityInput, this.state.selectedImage).then(
            (response) => {
                console.log(response);
                this.setState({ textInput: "", selectedImage: null });
                this.props.pass.current.fetchContent();
                Toast.success("Upload success");
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
                <TextInput style={styles.input} placeholder="Write Something!" value={this.state.textInput} onChangeText={(event) => this.setState({ textInput: event })} />
                <Button variant="outline-secondary" onPress={this.publishPost} title="Publish" color='blue' />
            </View>
        )
    }

    GetImageCamera = async () => {
        console.log("GetImageCamera");
        const granted = await ImagePicker.requestCameraPermissionsAsync();
        var result;
        if (granted) {

        }
        result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);

        if (!result.canceled) {
            this.setState({ selectedImage: result.assets[0] });
        }
    }

    GetImageLibrary = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            this.setState({ selectedImage: result.assets[0] });
        }
    }

    UploadAndDisplayImage = () => {
        console.log(this.state.selectedImage);
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection:'row', margin:10, backgroundColor:'' }}>
                <Button title="Library" onPress={this.GetImageLibrary} />
                <Button title="Camera" onPress={this.GetImageCamera} />
                {this.state.selectedImage ? <Image source={{ uri: this.state.selectedImage.uri }} style={{ width: 200, height: 200 }} /> : null}
            </View>
        );
    };


    render() {
        return (
            <View style={{backgroundColor:"white", margin:2}}>
                    <this.publishPostMenu />
                    <this.UploadAndDisplayImage />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
