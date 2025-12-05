import { StyleSheet, Text, Image } from 'react-native'
import { Link } from 'expo-router'
import Logo from '../assets/img/scooter.jpg'

// komponenter som fixar rätt style
import ThemedView from '../components/ThemedView' // basic style
import ThemedLogo from '../components/ThemedLogo' // logo style
import Spacer from '../components/Spacer' // space



const User = () => {

    // hämta namn och epost om användare
    return (
        <ThemedView style={styles.container}>
            <ThemedLogo source={Logo} />

            <Text style={styles.title}>Hoci scooters</Text>
            <Spacer />
            <Text>Användare namn</Text> 
            <Spacer />

            <Text>Användare e-post</Text>
            <Spacer />
            <Spacer />


            {/* ta bort sen, user kan vara "förstasida" som inloggad */}
            <Link style={styles.link} href="/">Hem</Link> 
            
        </ThemedView>
    )
}
export default User
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