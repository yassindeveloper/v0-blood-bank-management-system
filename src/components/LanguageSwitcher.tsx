"use client"
import { TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useLanguage } from "../contexts/LanguageContext"
import { useTheme } from "../contexts/ThemeContext"
import { Text } from "./Text"

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage()
  const { colors } = useTheme()

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar")
  }

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={toggleLanguage}
    >
      <Ionicons name="language-outline" size={16} color={colors.primary} />
      <Text style={[styles.text, { color: colors.text }]}>{language === "ar" ? "English" : "العربية"}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
})
