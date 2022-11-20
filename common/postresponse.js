import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Image, Button } from 'react-native';
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { Toast } from "toastify-react-native";


export default function PostResponse(props) {
    const response = props.response;
    const [isLike, setIsLike] = useState(response.islike);
    const [count, setCount] = useState(response.like?.length);
    const [userID, setUserID] = useState("");



    useEffect(() => {
        async function getUserID() {
            const currentUser = await AuthService.getCurrentUser();
            setUserID(currentUser.id);
        }
        getUserID();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    function like() {
        UserService.like(response._id).then(
            (response) => {
                console.log(response);
                setIsLike(true);
                setCount(count + 1);
                Toast.success("Like Successfully");
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
                Toast.success("Unlike Successfully");
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
                props.fetchContent();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    return (
        <View key={response._id} >
            <TouchableOpacity style={{ fontSize: 20, color: "black", textDecoration: 'none' }}
                onPress={() => props.navigation.navigate("Profile", { userID: response.author })} >
                <Text>{response?.username}</Text>
            </TouchableOpacity >
            <Text>{response?.text}</Text>

            {response.post_images ? <Image source={{ uri: response.post_images }} style={{ width: "100%", height: 200, resizeMode: 'contain' }} /> : null}
            <View>
                <View className="d-flex flex-row">
                    <View>
                        {!isLike ? <Button onPress={() => like()} title={"Like (" + count + ")"} />
                            : <Button onPress={() => unlike()} title={"Unlike (" + count + ")"} />}
                    </View>
                    <View>
                        {response.author === userID ?
                            <Button onPress={() => deletepost(response._id)} title="Delete" /> : null}
                    </View>
                </View>
            </View>
        </View>
    )
}