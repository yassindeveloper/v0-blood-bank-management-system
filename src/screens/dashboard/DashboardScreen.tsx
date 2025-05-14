"use client"

import React from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useLanguage } from "../../contexts/LanguageContext"
import { useTheme } from "../../contexts/ThemeContext"
import { Text } from "../../components/Text"
import { Card } from "../../components/Card"
import { BloodTypeCard } from "../../components/BloodTypeCard"
import { RecentDonationsList } from "../../components/RecentDonationsList"
import { Ionicons } from "@expo/vector-icons"

export default function DashboardScreen() {
  const { t } = useLanguage()
  const { colors } = useTheme()
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = React.useState(false)

  // In a real app, this data would come from your API
  const stats = [
    {
      title: t("totalDonors"),
      value: "1,248",
      change: "+12%",
      icon: "people-outline",
      color: colors.primary,
    },
    {
      title: t("totalPatients"),
      value: "856",
      change: "+5%",
      icon: "medkit-outline",
      color: colors.info,
    },
    {
      title: t("totalDonations"),
      value: "3,427",
      change: "+18%",
      icon: "trending-up-outline",
      color: colors.success,
    },
    {
      title: t("criticalStock"),
      value: "2",
      change: "-50%",
      icon: "warning-outline",
      color: colors.warning,
    },
  ]

  const bloodInventory = [
    { type: "A+", units: 45, status: "available" },
    { type: "A-", units: 12, status: "available" },
    { type: "B+", units: 30, status: "available" },
    { type: "B-", units: 8, status: "low" },
    { type: "AB+", units: 15, status: "available" },
    { type: "AB-", units: 5, status: "critical" },
    { type: "O+", units: 50, status: "available" },
    { type: "O-", units: 10, status: "low" },
  ]

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    // In a real app, you would fetch fresh data here
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />}
    >
      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <Card key={index} style={styles.statCard}>
            <View style={styles.statContent}>
              <View>
                <Text style={[styles.statTitle, { color: colors.secondary }]}>{stat.title}</Text>
                <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
                <Text
                  style={[
                    styles.statChange,
                    {
                      color: stat.change.startsWith("+") ? colors.success : colors.error,
                    },
                  ]}
                >
                  {stat.change}
                </Text>
              </View>
              <View style={[styles.iconContainer, { backgroundColor: `${stat.color}20` }]}>
                <Ionicons name={stat.icon} size={24} color={stat.color} />
              </View>
            </View>
          </Card>
        ))}
      </View>

      {/* Blood Inventory */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t("bloodInventory")}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("InventoryTab" as never)}>
            <Text style={[styles.viewAllText, { color: colors.primary }]}>{t("viewAll")}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bloodTypesContainer}>
          {bloodInventory.map((item, index) => (
            <BloodTypeCard key={index} type={item.type} units={item.units} status={item.status} />
          ))}
        </View>
      </View>

      {/* Recent Donations */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t("recentDonations")}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("DonorsTab" as never)}>
            <Text style={[styles.viewAllText, { color: colors.primary }]}>{t("viewAll")}</Text>
          </TouchableOpacity>
        </View>
        <RecentDonationsList />
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
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statCard: {
    width: "48%",
    marginBottom: 16,
  },
  statContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statChange: {
    fontSize: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAllText: {
    fontSize: 14,
  },
  bloodTypesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
})
