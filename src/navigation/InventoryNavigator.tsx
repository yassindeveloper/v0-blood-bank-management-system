"use client"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useLanguage } from "../contexts/LanguageContext"
import { useTheme } from "../contexts/ThemeContext"
import InventoryScreen from "../screens/inventory/InventoryScreen"
import AddInventoryScreen from "../screens/inventory/AddInventoryScreen"
import InventoryDetailsScreen from "../screens/inventory/InventoryDetailsScreen"

const Stack = createNativeStackNavigator()

export default function InventoryNavigator() {
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
      <Stack.Screen name="Inventory" component={InventoryScreen} options={{ title: t("inventory") }} />
      <Stack.Screen name="AddInventory" component={AddInventoryScreen} options={{ title: t("addInventory") }} />
      <Stack.Screen
        name="InventoryDetails"
        component={InventoryDetailsScreen}
        options={{ title: t("inventoryDetails") }}
      />
    </Stack.Navigator>
  )
}
