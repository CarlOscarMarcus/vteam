import { StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'

const Login = () => {
    return (
        <View styles={styles.container}>

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
    }
})