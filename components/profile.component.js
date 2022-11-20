import React, { Component } from "react";
import AuthService from "../services/auth.service";
import Content from "../common/content";
import UserService from "../services/user.service";

import { View, Button, Text, ScrollView } from "react-native";
export default class OthersProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: { username: "" },
            userProfile: {},
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true }, () => this.getUserDetail());
    }

    getUserDetail = () => {
        UserService.getProfileDetail(this.props.route.params.userID).then(
            (response) => {
                console.log(response.data)
                this.setState({
                    userProfile: response.data
                })
                console.log(this.state.userProfile)
            },
            (error) => {
                console.log(error);
            }
        );
    }

    othersProfile = () => {
        return (
        <View >
            <View>
                <Text>{this.state.userProfile.username}</Text>
            </View>
            {(!this.state.userProfile.follow) ?
                <Button
                onPress={() => this.pressFollow()}
                title="Follow"
                />
                :
                <Button
                onPress={() => this.pressUnfollow()}
                title="Unfollow"
                />
            }

        </View>)
    }

    pressFollow = () => {
        UserService.follow(this.state.userProfile._id).then(
            (response) => {
                console.log(response.data)
                this.getUserDetail();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    pressUnfollow = () => {
        UserService.unfollow(this.state.userProfile._id).then(
            (response) => {
                console.log(response.data)
                this.getUserDetail();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    render() {

        return (
            <ScrollView>
                {(this.state.userReady) ?
                    <View>
                        {this.othersProfile()}
                        <Content pageType="profile" profile_userID={this.props.route.params.userID} />
                    </View>
                    : null}
            </ScrollView>
        );
    }
}

