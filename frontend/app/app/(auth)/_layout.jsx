import { Stack } from 'expo-router'

// headerShown: false på options om man ska ta bort rubriken

export default function AuthLayout() {

    return (

        <Stack screenOptions={{
            headerShown: false, animation: "none"
        }}>

        </Stack>

    )
}

