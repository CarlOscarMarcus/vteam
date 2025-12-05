import { StyleSheet, Text, View } from 'react-native'
import { Stack } from 'expo-router'
import { Colors } from '../style/colors'

const RootLayout = () => {
    const theme = Colors
    return (

        <Stack screenOptions={{
            headerStyle: { backgroundColor: theme.header },
            headerTintColor: theme.headerText
        }}>
            <Stack.Screen name="index" options={{ title: 'Hem' }}/>
            <Stack.Screen name="login" options={{ title: 'Logga in' }}/>
            <Stack.Screen name="signup" options={{ title: 'Skapa konto' }}/>

        </Stack>

    )
}
export default RootLayout
const styles = StyleSheet.create({

})