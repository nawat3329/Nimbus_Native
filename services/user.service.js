import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_ROOT_URL + process.env.REACT_APP_CONTENT_API_URL;

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    async getHomeContent(page, userId) {
        return await axios.get(API_URL + "home", { params: { page, userId } });
    }

    async getHomeFollowContent(page) {
        return await axios.get(API_URL + "homefollow", { params: { page }, headers: await authHeader() });
    }

    async publishPost(text, visibility, image) {
        console.log(text);
        console.log(visibility);
        console.log(image);
        if(image){
            const formData = new FormData();
            formData.append('image', {
                uri: image.uri,
                type: image.type,
                name: "image.jpg",
            });
            formData.append('text', text);
            formData.append('visibility', visibility);
            return await axios.post(API_URL + "insertpostimage", formData, { headers: { ...await authHeader(), 'Content-Type': 'multipart/form-data'} });
        }
        else{
            return await axios.post(API_URL + "insertpost", { text, visibility}, { headers: await authHeader() });
        }
    }

    async getProfileContent(page, profile_userID){
        return await axios.get(API_URL + "getProfileContent", { params: { page, profile_userID } , headers: await authHeader() });
    }

    async getProfileDetail(profile_userID){
        return await axios.get(API_URL + "getProfileDetail", { params: { profile_userID } , headers: await authHeader() });
    }

    async getpostdetail(postId){
        return await axios.get(API_URL + "getpostdetail", { params: { postId } , headers: authHeader() });
    }

    async follow(profile_userID) {
        return await axios.post(API_URL + "follow", { profile_userID }, { headers: await authHeader() });
        
    }

    async unfollow(profile_userID) {
        console.log(profile_userID)
        return await  axios.post(API_URL + "unfollow", { profile_userID }, { headers: await authHeader() });
    }

    async getSelfProfileContent(page){
        return await axios.get(API_URL + "getSelfProfileContent", { params: {page} , headers: authHeader() });
    }

    async like(postId){
        console.log(postId)
        return await (axios.post(API_URL + "like", { postId }, { headers: await authHeader() }));
    }

    async unlike(postId){
        console.log(postId)
        return await (axios.post(API_URL + "unlike", { postId }, { headers: await authHeader() }));

    }

    async deletepost(postId){
        return await (axios.post(API_URL + "deletepost", { postId}, { headers: await authHeader() }));

    }
}

export default new UserService();