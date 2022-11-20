import React, { Component } from "react";
import { View, ScrollView } from 'react-native';

import Content from "../common/content";
import PostMenu from "../common/postmenu";

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.child = React.createRef();
	}

	render() {
		return (
			<View>
				<ScrollView>
					<PostMenu pass={this.child} />
					<Content ref={this.child} visibilityView="Public" pageType="home" />
				</ScrollView>
			</View>
		);
	}
}
