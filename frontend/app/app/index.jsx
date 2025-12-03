import { StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'

const Home = () => {
    return (
        <View styles={styles.container}>

            <Text style={styles.title}>Hem</Text>
        
            <Link style={styles.link} href="/login">Logga in</Link>
            <Link style={styles.link} href="/signup">Skapa konto</Link>
        </View>
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