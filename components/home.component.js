import { Logs } from "expo";
import React, { Component } from "react";
import { View, ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Content from "../common/content";
import PostMenu from "../common/postmenu";
import Profile from "./profile.component";
import { useNavigation, useRoute } from '@react-navigation/native';


export default class Home extends Component {
	constructor(props) {
		super(props);
		this.child = React.createRef();
		this.scrollRef = React.createRef();
	}
	
	MainHome = () => {
		const navigation = useNavigation();
		
		return (
			<View>
				<ScrollView ref={this.scrollRef}>
					<PostMenu pass={this.child} />
					<Content ref={this.child} pass={this.scrollRef} visibilityView={this.props.route.params.visibilityView} pageType="home" navigation={navigation}  />
				</ScrollView>
			</View>
		);
	}

	ProfilePage = () => {
		const route = useRoute();
		return (
			<View>
				<Profile route={route} />
			</View>
		);
	}

	
	render() {
		const HomeStack = createNativeStackNavigator();
		return (
			<HomeStack.Navigator options={{ headerShown: false }}>
				<HomeStack.Screen name="Home" component={this.MainHome}  />
				<HomeStack.Screen name="Profile" component={this.ProfilePage} />
			</HomeStack.Navigator>
			
		);
	}
}
