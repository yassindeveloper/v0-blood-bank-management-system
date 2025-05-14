"use client"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useLanguage } from "../contexts/LanguageContext"
import { useTheme } from "../contexts/ThemeContext"
import PatientsScreen from "../screens/patients/PatientsScreen"
import AddPatientScreen from "../screens/patients/AddPatientScreen"
import PatientDetailsScreen from "../screens/patients/PatientDetailsScreen"

const Stack = createNativeStackNavigator()

export default function PatientsNavigator() {
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
      <Stack.Screen name="Patients" component={PatientsScreen} options={{ title: t("patients") }} />
      <Stack.Screen name="AddPatient" component={AddPatientScreen} options={{ title: t("addNewPatient") }} />
      <Stack.Screen name="PatientDetails" component={PatientDetailsScreen} options={{ title: t("patientDetails") }} />
    </Stack.Navigator>
  )
}
