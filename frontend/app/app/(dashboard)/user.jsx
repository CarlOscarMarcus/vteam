import { StyleSheet, Text } from 'react-native'
import { Link } from 'expo-router'
import Logo from '../../assets/img/scooter.jpg'
import { getToken } from '../../components/Token.jsx'


// komponenter som fixar rätt style
import ThemedView from '../../components/ThemedView' // basic style
import ThemedLogo from '../../components/ThemedLogo' // logo style
import Spacer from '../../components/Spacer' // space


const User = () => {
    // kollar om användaren är inloggad, om inte redirect till inloggning.
    useEffect (() => {
        async function checkToken() {
            const token = await getToken()
            if (!token) {
                router.replace("/login")
            }
        }
        checkToken()
    }, [])
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
            <Text>Saldo</Text>

            <Spacer />
            <Text>Resor</Text>

            <Spacer />


            {/* ta bort sen, user kan vara "förstasida" som inloggad? */}
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