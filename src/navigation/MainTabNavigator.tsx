"use client"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import { useLanguage } from "../contexts/LanguageContext"
import { useTheme } from "../contexts/ThemeContext"
import DashboardScreen from "../screens/dashboard/DashboardScreen"
import DonorsNavigator from "./DonorsNavigator"
import PatientsNavigator from "./PatientsNavigator"
import InventoryNavigator from "./InventoryNavigator"
import SettingsScreen from "../screens/settings/SettingsScreen"

const Tab = createBottomTabNavigator()

export default function MainTabNavigator() {
  const { t, isRTL } = useLanguage()
  const { colors } = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
      initialRouteName="Dashboard"
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: t("dashboard"),
          tabBarLabel: t("dashboard"),
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="DonorsTab"
        component={DonorsNavigator}
        options={{
          headerShown: false,
          title: t("donors"),
          tabBarLabel: t("donors"),
          tabBarIcon: ({ color, size }) => <Ionicons name="people-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="PatientsTab"
        component={PatientsNavigator}
        options={{
          headerShown: false,
          title: t("patients"),
          tabBarLabel: t("patients"),
          tabBarIcon: ({ color, size }) => <Ionicons name="medkit-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="InventoryTab"
        component={InventoryNavigator}
        options={{
          headerShown: false,
          title: t("inventory"),
          tabBarLabel: t("inventory"),
          tabBarIcon: ({ color, size }) => <Ionicons name="water-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: t("settings"),
          tabBarLabel: t("settings"),
          tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  )
}
