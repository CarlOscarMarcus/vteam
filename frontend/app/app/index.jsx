import { StyleSheet, Text, View, Image } from 'react-native'
import { Link } from 'expo-router'
import Logo from '../assets/img/scooter.jpg'

// komponenter som fixar rätt style
import ThemedView from '../components/ThemedView' // basic style
import ThemedLogo from '../components/ThemedLogo' // logo style
import Spacer from '../components/Spacer' // space



const Home = () => {
    return (
        <ThemedView style={styles.container}>
            <ThemedLogo source={Logo} />

            <Text style={styles.title}>Hoci scooters</Text>
            <Spacer />
        
            <Link style={styles.link} href="/login">Logga in</Link>
            <Link style={styles.link} href="/signup">Skapa konto</Link>

            {/* ta bort sen, visas inte om du inte är inloggad */}
            <Link style={styles.link} href="/user">Användare</Link>
            <Link style={styles.link} href="/map">Karta</Link>


        </ThemedView>
    )
}
export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        margin: 10
    },
    link: {
        fontWeight: 'bold',
    }
})