"use client"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useAuth } from "../contexts/AuthContext"
import LoginScreen from "../screens/auth/LoginScreen"
import MainTabNavigator from "./MainTabNavigator"
import LoadingScreen from "../screens/LoadingScreen"

const Stack = createNativeStackNavigator()

export default function RootNavigator() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Main" component={MainTabNavigator} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  )
}
