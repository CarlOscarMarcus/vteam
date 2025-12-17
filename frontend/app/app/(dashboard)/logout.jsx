import { StyleSheet, Text } from 'react-native'
import { Link, router } from 'expo-router'
import { deleteToken } from '../../components/Token.jsx'

import ThemedView from '../../components/ThemedView'

// Logga ut!

async function logOut() {
    await deleteToken()
    router.replace("/login")
}

const Signout = () => {
    logOut()

    return (
        
        <ThemedView style={styles.container}>
            
            <Text style={styles.title}>Hoci scooters</Text>
            <Text>Du har loggats ut.</Text>

            {/* ta bort sen, user kan vara "förstasida" som inloggad? */}
            <Link style={styles.link} href="/login">Logga in igen?</Link> 
            
        </ThemedView>


    )
}
export default Signout
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        margin: 10
    },
    link: {
        fontWeight: 'bold',
    }
})