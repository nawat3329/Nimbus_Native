import React, { Component } from "react";
import { View, Button, Text, TextInput } from "react-native";


import AuthService from "../services/auth.service";


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            successful: false,
            message: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e
        });
    }

    handleLogin() {

        this.setState({
            message: "",
            successful: false
        });
        console.log("Login Press");
        AuthService.login(
            this.state.username,
            this.state.password
        ).then(
            (response) => {
                console.log(response);
                console.log("LOGIN!");
                this.props.route.params.setLoginState(true);
            },
            (error) => {
                console.log("Error again");
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    successful: false,
                    message: resMessage
                });
            }
        );
    }

    render() {
        return (
            <View>
                <Text>Register</Text>
                {!this.state.successful && (
                    <View>
                        <Text>Username</Text>
                        <TextInput
                            value={this.state.username}
                            onChangeText={this.onChangeUsername}
                        />
                        <Text>Password</Text>
                        <TextInput
                            value={this.state.password}
                            onChangeText={this.onChangePassword}
                            secureTextEntry={true}
                        />


                        <Button
                            onPress={this.handleLogin}
                            title="Login"
                        />
                        <Button
                            onPress={() => this.props.navigation.navigate("Register")}
                            title="Register"
                        />
                        <Text>{this.state.message}</Text>

                    </View>
                )}


            </View>

        );
    }
}