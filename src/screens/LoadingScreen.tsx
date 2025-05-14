"use client"
import { View, ActivityIndicator, StyleSheet } from "react-native"
import { useTheme } from "../contexts/ThemeContext"
import { Text } from "../components/Text"
import { useLanguage } from "../contexts/LanguageContext"

export default function LoadingScreen() {
  const { colors } = useTheme()
  const { t } = useLanguage()

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={[styles.text, { color: colors.text }]}>{t("loading")}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 16,
    fontSize: 16,
  },
})
