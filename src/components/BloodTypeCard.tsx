"use client"
import { View, StyleSheet } from "react-native"
import { useTheme } from "../contexts/ThemeContext"
import { useLanguage } from "../contexts/LanguageContext"
import { Text } from "./Text"
import { Card } from "./Card"

interface BloodTypeCardProps {
  type: string
  units: number
  status: string
}

export const BloodTypeCard = ({ type, units, status }: BloodTypeCardProps) => {
  const { colors } = useTheme()
  const { t } = useLanguage()

  const getStatusColor = () => {
    switch (status) {
      case "available":
        return colors.success
      case "low":
        return colors.warning
      case "critical":
        return colors.error
      default:
        return colors.secondary
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "available":
        return t("available")
      case "low":
        return t("low")
      case "critical":
        return t("critical")
      default:
        return status
    }
  }

  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <View style={[styles.typeContainer, { backgroundColor: `${colors.primary}20` }]}>
          <Text style={[styles.typeText, { color: colors.primary }]}>{type}</Text>
        </View>
        <Text style={[styles.unitsText, { color: colors.text }]}>{units}</Text>
        <Text style={[styles.unitsLabel, { color: colors.secondary }]}>{t("units")}</Text>
        <View style={[styles.statusContainer, { backgroundColor: `${getStatusColor()}20` }]}>
          <Text style={[styles.statusText, { color: getStatusColor() }]}>{getStatusText()}</Text>
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    marginBottom: 16,
  },
  content: {
    alignItems: "center",
  },
  typeContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  typeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  unitsText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  unitsLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  statusContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
})
