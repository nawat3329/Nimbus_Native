import React, { Component } from "react";
import { View, Button, Text, TextInput } from "react-native";


import AuthService from "../services/auth.service";


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
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

    handleRegister() {

        this.setState({
            message: "",
            successful: false
        });

        AuthService.register(
            this.state.username,
            this.state.email,
            this.state.password
        ).then(
            response => {
                this.setState({
                    message: response.data.message,
                    successful: true
                });
            },
            error => {
                console.log("register error", error);
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
                        <Text>Email</Text>
                        <TextInput
                            value={this.state.email}
                            onChangeText={this.onChangeEmail}
                        />
                        <Text>Password</Text>
                        <TextInput
                            value={this.state.password}
                            onChangeText={this.onChangePassword}
                            secureTextEntry={true}
                        />


                        {/* <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        validations={[required, vpassword]}
                                    />
                                </div> */}

                        <Button
                            onPress={this.handleRegister}
                            title="Sign up"
                        />

                    </View>
                )}

                {this.state.message && (
                    <View>
                        <Text>{this.state.message}</Text>
                        <Button
                            onPress={this.props.navigation.navigate("Login")}
                            title="Sign up" 
                        />
                    </View>
                )}


            </View>

        );
    }
}