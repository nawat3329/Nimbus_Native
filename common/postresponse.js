import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Image, Button } from 'react-native';
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

export default function PostResponse(props) {
    const response = props.response;
    const [isLike, setIsLike] = useState(response.islike);
    const [count, setCount] = useState(response.like?.length);
    const [userID, setUserID] = useState("");


    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        if (currentUser) {
            setUserID(currentUser.id);

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function like() {
        UserService.like(response._id).then(
            (response) => {
                console.log(response);
                setIsLike(true);
                setCount(count + 1);
            },
            (error) => {
                console.log(error);

            }
        );
    }

    function unlike() {
        UserService.unlike(response._id).then(
            (response) => {
                console.log(response)
                setIsLike(false);
                setCount(count - 1);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    function deletepost() {
        UserService.deletepost(response._id).then(
            (response) => {
                console.log(response);
                this.props.navigation.navigate('Home');
                
            },
            (error) => {
                console.log(error);
            }
        );
    }

    return (
        <View key={response._id} >
            <TouchableOpacity style={{ fontSize: 20, color: "black", textDecoration: 'none' }} >
                <Text>{response?.username}</Text>
            </TouchableOpacity >
            <TouchableOpacity style={{ color: "black", textDecoration: 'none' }} >
                <Text>{response?.text}</Text>
                
                {response.post_images ? <Image source={{uri: response.post_images}} style={{ width: "100%", height: 200, resizeMode: 'contain'}}   /> : null}
            </TouchableOpacity>
                <View>
                    <View className="d-flex flex-row">
                        <View>
                            {!isLike ? <Button  onPress={() => like()}  title={"Like (" + count + ")"}  />
                                : <Button  onPress={() => unlike()} title={"Unlike (" + count + ")"} />}
                        </View>
                        <View>
                            <Button href={"/post/" + response._id} variant="secondary" 
                                title= {"Comment ("+response.comment?.length+")"} />
                        </View>
                        <View>
                            {response.author === userID ?
                                <Button  onPress={() => setEditMode(prevMode => !prevMode)} title="Edit" />: null}
                        </View>
                        <View >
                            {response.author === userID ?
                                <Button  onPress={() => deletepost(response._id)} title="Delete" /> : null}
                        </View>
                    </View>
                </View>
        </View>
    )
}