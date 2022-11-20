import * as SecureStore from 'expo-secure-store';
export default function authHeader() {
    const user = JSON.parse(SecureStore.getItemAsync('user'));

    if (user && user.accessToken) {
        // for Node.js Express back-end
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}