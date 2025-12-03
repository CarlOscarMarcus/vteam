import { StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'

const SkapaKonto = () => {
    return (
        <View styles={styles.container}>

            <Text style={styles.title}>Skapa konto</Text>
        
            <Link style={styles.link} href="/">Hem</Link>
            <Link style={styles.link} href="/login">Logga in</Link>
        </View>
    )
}
export default SkapaKonto
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