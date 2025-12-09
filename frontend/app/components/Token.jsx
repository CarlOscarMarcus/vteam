import * as SecureStore from 'expo-secure-store'

// spara token
export async function saveToken(token) {
    try {
        await SecureStore.setItemAsync('userToken', token)
        console.log("token sparad.")
    } catch (err) {
        console.error("gick inte att spara token.")
    }
}

// hämta token
export async function getToken() {
    try {
        const token = await SecureStore.getItemAsync('userToken')
        if (token) {
            console.log('token hittad', token)
            return token
        } else {
            console.log('ingen token finns.')
            return null
        }
    } catch (err) {
        console.error('fel vid försök att hämta token', err)
    }
}

// ta bort token, för utloggning
export async function deleteToken() {
    try {
        await SecureStore.deleteItemAsync('userToken')
        console.log('token borttagen')
    } catch (err) {
        console.error('kunde inte ta bort token', err)
    }
}
