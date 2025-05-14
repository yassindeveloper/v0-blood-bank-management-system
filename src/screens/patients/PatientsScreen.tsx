"use client"

import { useState } from "react"
import { View, StyleSheet, FlatList, RefreshControl, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { useLanguage } from "../../contexts/LanguageContext"
import { useTheme } from "../../contexts/ThemeContext"
import { Text } from "../../components/Text"
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import { PatientCard } from "../../components/PatientCard"

// Mock data - in a real app, this would come from your API
const mockPatients = [
  {
    id: "1",
    name: "خالد محمود",
    bloodType: "A+",
    hospital: "مستشفى المركزي",
    status: "active",
    phone: "0123456789",
    email: "khaled@example.com",
    address: "القاهرة، مصر",
    dateOfBirth: "1980-05-15",
  },
  {
    id: "2",
    name: "ليلى عبد الله",
    bloodType: "O-",
    hospital: "مستشفى الأمل",
    status: "critical",
    phone: "0123456788",
    email: "laila@example.com",
    address: "الإسكندرية، مصر",
    dateOfBirth: "1975-11-22",
  },
  {
    id: "3",
    name: "عمر سعيد",
    bloodType: "B+",
    hospital: "مستشفى الشفاء",
    status: "stable",
    phone: "0123456787",
    email: "omar@example.com",
    address: "الجيزة، مصر",
    dateOfBirth: "1990-03-10",
  },
]

export default function PatientsScreen() {
  const navigation = useNavigation()
  const { t, isRTL } = useLanguage()
  const { colors } = useTheme()

  const [searchQuery, setSearchQuery] = useState("")
  const [patients, setPatients] = useState(mockPatients)
  const [refreshing, setRefreshing] = useState(false)

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.bloodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.hospital.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddPatient = () => {
    navigation.navigate("AddPatient" as never)
  }

  const handlePatientPress = (patient: any) => {
    navigation.navigate("PatientDetails" as never, { patient } as never)
  }

  const handleDeletePatient = (patientId: string) => {
    Alert.alert(
      t("confirm"),
      t("confirmDelete"),
      [
        {
          text: t("no"),
          style: "cancel",
        },
        {
          text: t("yes"),
          onPress: () => {
            setPatients(patients.filter((patient) => patient.id !== patientId))
          },
          style: "destructive",
        },
      ],
      { cancelable: true },
    )
  }

  const onRefresh = () => {
    setRefreshing(true)
    // In a real app, you would fetch fresh data here
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Input
          placeholder={t("searchPatients")}
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Ionicons name="search" size={20} color={colors.secondary} />}
          containerStyle={styles.searchInput}
          isRTL={isRTL}
        />
        <Button
          title={t("addNewPatient")}
          onPress={handleAddPatient}
          icon={<Ionicons name="add" size={20} color="white" />}
          style={styles.addButton}
        />
      </View>

      <FlatList
        data={filteredPatients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PatientCard
            patient={item}
            onPress={() => handlePatientPress(item)}
            onDelete={() => handleDeletePatient(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="medkit" size={64} color={colors.secondary} />
            <Text style={[styles.emptyText, { color: colors.secondary }]}>
              {searchQuery ? t("noSearchResults") : t("noPatients")}
            </Text>
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
  },
  addButton: {
    height: 50,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: "center",
  },
})
