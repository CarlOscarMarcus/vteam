import { StyleSheet, Text, View, Image } from 'react-native'
import { Link } from 'expo-router'
import Logo from '../assets/img/scooter.jpg'


const Login = () => {
    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.img} />

            <Text style={styles.title}>Logga in</Text>
        
            <Link style={styles.link} href="/">Hem</Link>
            <Link style={styles.link} href="/signup">Skapa konto</Link>
        </View>
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
        fontSize: 18,
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