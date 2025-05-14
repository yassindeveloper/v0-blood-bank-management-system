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
import { DonorCard } from "../../components/DonorCard"

// Mock data - in a real app, this would come from your API
const mockDonors = [
  {
    id: "1",
    name: "أحمد محمد",
    bloodType: "A+",
    phone: "0123456789",
    lastDonation: "2023-05-15",
    email: "ahmed@example.com",
    address: "القاهرة، مصر",
    gender: "male",
    dateOfBirth: "1990-01-01",
    weight: 75,
  },
  {
    id: "2",
    name: "سارة أحمد",
    bloodType: "O-",
    phone: "0123456788",
    lastDonation: "2023-05-14",
    email: "sara@example.com",
    address: "الإسكندرية، مصر",
    gender: "female",
    dateOfBirth: "1992-03-15",
    weight: 65,
  },
  {
    id: "3",
    name: "محمد علي",
    bloodType: "B+",
    phone: "0123456787",
    lastDonation: "2023-05-13",
    email: "mohamed@example.com",
    address: "الجيزة، مصر",
    gender: "male",
    dateOfBirth: "1985-07-22",
    weight: 80,
  },
  {
    id: "4",
    name: "فاطمة حسن",
    bloodType: "AB+",
    phone: "0123456786",
    lastDonation: "2023-05-12",
    email: "fatma@example.com",
    address: "المنصورة، مصر",
    gender: "female",
    dateOfBirth: "1995-11-10",
    weight: 62,
  },
]

export default function DonorsScreen() {
  const navigation = useNavigation()
  const { t, isRTL } = useLanguage()
  const { colors } = useTheme()

  const [searchQuery, setSearchQuery] = useState("")
  const [donors, setDonors] = useState(mockDonors)
  const [refreshing, setRefreshing] = useState(false)

  const filteredDonors = donors.filter(
    (donor) =>
      donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.bloodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.phone.includes(searchQuery),
  )

  const handleAddDonor = () => {
    navigation.navigate("AddDonor" as never)
  }

  const handleDonorPress = (donor: any) => {
    navigation.navigate("DonorDetails" as never, { donor } as never)
  }

  const handleDeleteDonor = (donorId: string) => {
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
            setDonors(donors.filter((donor) => donor.id !== donorId))
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
          placeholder={t("searchDonors")}
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Ionicons name="search" size={20} color={colors.secondary} />}
          containerStyle={styles.searchInput}
          isRTL={isRTL}
        />
        <Button
          title={t("addNewDonor")}
          onPress={handleAddDonor}
          icon={<Ionicons name="add" size={20} color="white" />}
          style={styles.addButton}
        />
      </View>

      <FlatList
        data={filteredDonors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DonorCard donor={item} onPress={() => handleDonorPress(item)} onDelete={() => handleDeleteDonor(item.id)} />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="people" size={64} color={colors.secondary} />
            <Text style={[styles.emptyText, { color: colors.secondary }]}>
              {searchQuery ? t("noSearchResults") : t("noDonors")}
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
