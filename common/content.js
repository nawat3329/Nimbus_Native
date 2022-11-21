import React, { Component } from "react";
import { Button, View } from 'react-native';
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import PostResponse from "./postresponse";
export default class Content extends Component {
	constructor(props) {
		super(props);

		this.state = {
			content: "",
			page: 1,
			totalPage: 1,
			userID: null
		};
	}

	async componentDidMount() {
		const currentUser =  await AuthService.getCurrentUser();
		this.setState({userID: currentUser.id}, () => {this.fetchContent()}) ;
	}

	fetchContent = () => {
		console.log(this.props.pageType)
		console.log(this.state.totalPage);
		console.log(this.state.page);
		if (this.props.pageType === "home") {
			if (this.props.visibilityView === "Public") {
				UserService.getHomeContent(this.state.page, this.state.userID).then(
					(response) => {
						this.setState({
							totalPage: response.data.totalPage
						})
						this.insertResponse(response.data.postRes)
						this.props.pass.current.scrollTo({x: 0, y: 0, animated: true})
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
			else if (this.props.visibilityView === "Follow") {
				UserService.getHomeFollowContent(this.state.page).then(
					(response) => {
						this.setState({
							totalPage: response.data.totalPage
						})
						this.insertResponse(response.data.postRes)
						this.props.pass.current.scrollTo({x: 0, y: 0, animated: true})
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
		}
		else if (this.props.pageType === "profile") {
			if (this.props.profile_userID) {
				UserService.getProfileContent(this.state.page, this.props.profile_userID).then(
					(response) => {
						console.log(response);
						this.setState({
							totalPage: response.data.totalPage
						})
						this.insertResponse(response.data.postRes)
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
			else {
				UserService.getSelfProfileContent(this.state.page).then(
					(response) => {
						console.log(response);
						this.setState({
							totalPage: response.data.totalPage
						})
						this.insertResponse(response.data.postRes)
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
		}
	}

	insertResponse = (response) => {
		console.log(this.state.page);
		console.log(response);
		const rows = [];
		for (let i = 0; i < response.length; i++) {
			rows.push(
				<PostResponse key={response[i]._id} response={response[i]} fetchContent={this.fetchContent} navigation={this.props.navigation}/>
			);
		}
		console.log(rows)
		this.setState({
			content: rows,
		});
	}

	changePage = (move) => {
		this.setState((prevState) => ({
			page: prevState.page + move
		}),
			() => this.fetchContent());
	}

	pageButton = () => {
		return (
			<View style={{ flexDirection:"row", justifyContent:"space-around"}}>
				<Button
					disabled={this.state.page <= 1}
					onPress={() => this.changePage(-1)}
					title="Previous Page"
					
				/>
					
				<Button
					disabled={this.state.page >= this.state.totalPage}
					onPress={() => this.changePage(1)}
					title="Next Page" />
			</View>
		)
	}

	

	render() {
		return (
			<View >
				<Button title="Refresh" onPress={this.fetchContent}/>
				{this.state.content}
				<this.pageButton />
			</View>
		);
	}
}
