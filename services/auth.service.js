import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import {REACT_APP_ROOT_URL, REACT_APP_AUTH_API_URL} from "@env"

const API_URL = REACT_APP_ROOT_URL + REACT_APP_AUTH_API_URL;

class AuthService {
    async login(username, password) {
        console.log(username, password);
        return axios.post(API_URL + "signin", {username,password})
        .then(async (response) => {
            console.log("not error");
            if (response.data.accessToken) {
                await SecureStore.setItemAsync('user', JSON.stringify(response.data));
            }
            console.log(response);
            return response.data;
        })
    }

    logout() {
        SecureStore.deleteItemAsync('user');
    }

    register(username, email, password) {
        console.log(username, email, password);
        console.log(API_URL);
        return axios.post(API_URL + "signup", { 
            username,
            email,
            password
        });
    }

    async getCurrentUser() {
        return await JSON.parse(SecureStore.getItemAsync('user'));
    }
}

export default new AuthService();