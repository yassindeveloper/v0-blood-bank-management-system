"use client"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useLanguage } from "../contexts/LanguageContext"
import { useTheme } from "../contexts/ThemeContext"
import DonorsScreen from "../screens/donors/DonorsScreen"
import AddDonorScreen from "../screens/donors/AddDonorScreen"
import DonorDetailsScreen from "../screens/donors/DonorDetailsScreen"

const Stack = createNativeStackNavigator()

export default function DonorsNavigator() {
  const { t } = useLanguage()
  const { colors } = useTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="Donors" component={DonorsScreen} options={{ title: t("donors") }} />
      <Stack.Screen name="AddDonor" component={AddDonorScreen} options={{ title: t("addDonor") }} />
      <Stack.Screen name="DonorDetails" component={DonorDetailsScreen} options={{ title: t("donorDetails") }} />
    </Stack.Navigator>
  )
}
