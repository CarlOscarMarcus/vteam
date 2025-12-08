import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { Stack } from 'expo-router'
import { Colors } from '../style/colors'

// headerShown: false på options om man ska ta bort rubriken

const RootLayout = () => {
    const theme = Colors
    return (
        <>
        <Stack screenOptions={{
            headerStyle: { backgroundColor: theme.header },
            headerTintColor: theme.headerText
        }}>
            <Stack.Screen name="(auth)" options={{ headerShown: false}}/>

            <Stack.Screen name="index" options={{ title: 'Hem' }}/>

        </Stack>
        </>

    )
}
export default RootLayout
const styles = StyleSheet.create({

})