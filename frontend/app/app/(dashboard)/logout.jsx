import { StyleSheet, Text, Image } from 'react-native'
import { Link } from 'expo-router'

import ThemedView from '../../components/ThemedView'

// Logga ut!

const Signout = () => {

    return (
        <ThemedView style={styles.container}>

            <Text style={styles.title}>Hoci scooters</Text>


            {/* ta bort sen, user kan vara "förstasida" som inloggad? */}
            <Link style={styles.link} href="/">Hem</Link> 
            
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