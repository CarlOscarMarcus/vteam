import { Tabs } from 'expo-router'
import { Colors } from '../../style/colors'

// headerShown: false på options om man ska ta bort rubriken


export default function DashboardLayout() {
    const colors = Colors

    return (

        <Tabs 
        screenOptions={{ headerShown: false, tabBarStyle: {
            backgroundColor: colors.title,
            paddingTop: 10,
            height: 80
        },
        tabBarActiveTintColor: colors.navActive,
        tabBarInactiveTintColor: colors.navInactive }}
        >
        
        <Tabs.Screen name="user" options={{ title: "Profil"}} />
        <Tabs.Screen name="map" options={{ title: "Karta"}} />
        <Tabs.Screen name="balance" options={{ title: "Saldo"}} />
        <Tabs.Screen name="receipts" options={{ title: "Betala"}} />
        <Tabs.Screen name="logout" options={{ title: "Logga ut"}} />
        </Tabs>

    )
}

