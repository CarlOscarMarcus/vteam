import { StyleSheet, Text, Image } from 'react-native'
import { Link } from 'expo-router'
import Logo from '../assets/img/scooter.jpg'

import ThemedView from '../components/ThemedView'

// hyra cyklar, använda kartan
// flera sidor eller bara en?

const Login = () => {

    return (
        <ThemedView style={styles.container}>
            <Image source={Logo} style={styles.img} />

            <Text style={styles.title}>Hoci scooters</Text>


            {/* ta bort sen, user kan vara "förstasida" som inloggad? */}
            <Link style={styles.link} href="/">Hem</Link> 
            
        </ThemedView>
    )
}
export default Login
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
    },
    img: {
        marginVertical: 20,
        width: 130,
        height: 130
    }
})