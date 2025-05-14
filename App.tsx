import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { LanguageProvider } from "./src/contexts/LanguageContext"
import { AuthProvider } from "./src/contexts/AuthContext"
import RootNavigator from "./src/navigation/RootNavigator"
import { ThemeProvider } from "./src/contexts/ThemeContext"

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <NavigationContainer>
              <StatusBar style="auto" />
              <RootNavigator />
            </NavigationContainer>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
