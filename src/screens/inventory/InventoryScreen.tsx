"use client"

import { useState } from "react"
import { View, StyleSheet, FlatList, RefreshControl } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { useLanguage } from "../../contexts/LanguageContext"
import { useTheme } from "../../contexts/ThemeContext"
import { Text } from "../../components/Text"
import { Button } from "../../components/Button"
import { InventoryCard } from "../../components/InventoryCard"
import { SegmentedControl } from "../../components/SegmentedControl"
import { InventoryChart } from "../../components/InventoryChart"

// Mock data - in a real app, this would come from your API
const mockInventory = [
  { id: "1", type: "A+", units: 45, lastUpdated: "2023-05-15", status: "available" },
  { id: "2", type: "A-", units: 12, lastUpdated: "2023-05-14", status: "available" },
  { id: "3", type: "B+", units: 30, lastUpdated: "2023-05-13", status: "available" },
  { id: "4", type: "B-", units: 8, lastUpdated: "2023-05-12", status: "low" },
  { id: "5", type: "AB+", units: 15, lastUpdated: "2023-05-11", status: "available" },
  { id: "6", type: "AB-", units: 5, lastUpdated: "2023-05-10", status: "critical" },
  { id: "7", type: "O+", units: 50, lastUpdated: "2023-05-09", status: "available" },
  { id: "8", type: "O-", units: 10, lastUpdated: "2023-05-08", status: "low" },
]

export default function InventoryScreen() {
  const navigation = useNavigation()
  const { t } = useLanguage()
  const { colors } = useTheme()

  const [inventory, setInventory] = useState(mockInventory)
  const [refreshing, setRefreshing] = useState(false)
  const [viewMode, setViewMode] = useState("table") // 'table' or 'chart'

  const handleAddInventory = () => {
    navigation.navigate("AddInventory" as never)
  }

  const handleInventoryPress = (item: any) => {
    navigation.navigate("InventoryDetails" as never, { item } as never)
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
        <SegmentedControl
          values={[t("tableView"), t("chartView")]}
          selectedIndex={viewMode === "table" ? 0 : 1}
          onChange={(index) => setViewMode(index === 0 ? "table" : "chart")}
          style={styles.segmentedControl}
        />
        <Button
          title={t("addInventory")}
          onPress={handleAddInventory}
          icon={<Ionicons name="add" size={20} color="white" />}
          style={styles.addButton}
        />
      </View>

      {viewMode === "table" ? (
        <FlatList
          data={inventory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <InventoryCard item={item} onPress={() => handleInventoryPress(item)} />}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="water" size={64} color={colors.secondary} />
              <Text style={[styles.emptyText, { color: colors.secondary }]}>{t("noInventory")}</Text>
            </View>
          }
        />
      ) : (
        <View style={styles.chartContainer}>
          <InventoryChart data={inventory} />
        </View>
      )}
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
  segmentedControl: {
    flex: 1,
    marginRight: 8,
  },
  addButton: {
    height: 40,
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
  chartContainer: {
    flex: 1,
    padding: 16,
  },
})
