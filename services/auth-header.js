import * as SecureStore from 'expo-secure-store';
export default async function authHeader() {
    const user =  JSON.parse(await SecureStore.getItemAsync('user'));
    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}