"use client"
import { View, StyleSheet, ScrollView, Alert } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { useLanguage } from "../../contexts/LanguageContext"
import { useTheme } from "../../contexts/ThemeContext"
import { Text } from "../../components/Text"
import { Button } from "../../components/Button"
import { Card } from "../../components/Card"

export default function DonorDetailsScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const { t } = useLanguage()
  const { colors } = useTheme()

  const donor = route.params?.donor

  if (!donor) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.error }}>{t("donorNotFound")}</Text>
      </View>
    )
  }

  const handleEdit = () => {
    navigation.navigate("AddDonor" as never, { donor } as never)
  }

  const handleDelete = () => {
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
            // In a real app, you would call your API to delete the donor
            navigation.goBack()
          },
          style: "destructive",
        },
      ],
      { cancelable: true },
    )
  }

  const donorDetails = [
    { label: t("fullName"), value: donor.name },
    { label: t("bloodType"), value: donor.bloodType },
    { label: t("phone"), value: donor.phone },
    { label: t("email"), value: donor.email },
    { label: t("gender"), value: donor.gender === "male" ? t("male") : t("female") },
    { label: t("dateOfBirth"), value: new Date(donor.dateOfBirth).toLocaleDateString() },
    { label: t("weight"), value: `${donor.weight} ${t("kg")}` },
    { label: t("address"), value: donor.address },
    { label: t("lastDonation"), value: new Date(donor.lastDonation).toLocaleDateString() },
  ]

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <View style={[styles.avatarContainer, { backgroundColor: `${colors.primary}20` }]}>
          <Text style={[styles.avatarText, { color: colors.primary }]}>{donor.name.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={[styles.name, { color: colors.text }]}>{donor.name}</Text>
        <View style={[styles.bloodTypeBadge, { backgroundColor: `${colors.primary}20` }]}>
          <Text style={[styles.bloodTypeText, { color: colors.primary }]}>{donor.bloodType}</Text>
        </View>
      </View>

      <Card style={styles.detailsCard}>
        {donorDetails.map((detail, index) => (
          <View key={index} style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.secondary }]}>{detail.label}</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{detail.value}</Text>
          </View>
        ))}
      </Card>

      <View style={styles.actionsContainer}>
        <Button
          title={t("edit")}
          onPress={handleEdit}
          icon={<Ionicons name="create-outline" size={20} color="white" />}
          style={[styles.actionButton, { backgroundColor: colors.info }]}
        />
        <Button
          title={t("delete")}
          onPress={handleDelete}
          icon={<Ionicons name="trash-outline" size={20} color="white" />}
          style={[styles.actionButton, { backgroundColor: colors.error }]}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bloodTypeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  bloodTypeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detailsCard: {
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  detailLabel: {
    fontSize: 16,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
})
