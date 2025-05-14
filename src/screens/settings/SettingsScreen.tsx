"use client"
import { StyleSheet, ScrollView, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { useLanguage } from "../../contexts/LanguageContext"
import { useTheme } from "../../contexts/ThemeContext"
import { useAuth } from "../../contexts/AuthContext"
import { SettingsItem } from "../../components/SettingsItem"
import { SettingsSection } from "../../components/SettingsSection"

export default function SettingsScreen() {
  const navigation = useNavigation()
  const { t, language, setLanguage } = useLanguage()
  const { theme, setTheme, colors } = useTheme()
  const { logout } = useAuth()

  const handleLanguageChange = () => {
    Alert.alert(
      t("language"),
      t("selectLanguage"),
      [
        {
          text: "العربية",
          onPress: () => setLanguage("ar"),
        },
        {
          text: "English",
          onPress: () => setLanguage("en"),
        },
      ],
      { cancelable: true },
    )
  }

  const handleThemeChange = () => {
    Alert.alert(
      t("theme"),
      t("selectTheme"),
      [
        {
          text: t("light"),
          onPress: () => setTheme("light"),
        },
        {
          text: t("dark"),
          onPress: () => setTheme("dark"),
        },
        {
          text: t("system"),
          onPress: () => setTheme("system"),
        },
      ],
      { cancelable: true },
    )
  }

  const handleLogout = () => {
    Alert.alert(
      t("logout"),
      t("confirmLogout"),
      [
        {
          text: t("cancel"),
          style: "cancel",
        },
        {
          text: t("logout"),
          onPress: () => logout(),
          style: "destructive",
        },
      ],
      { cancelable: true },
    )
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <SettingsSection title={t("preferences")}>
        <SettingsItem
          icon={<Ionicons name="language-outline" size={24} color={colors.primary} />}
          title={t("language")}
          value={language === "ar" ? t("arabic") : t("english")}
          onPress={handleLanguageChange}
        />
        <SettingsItem
          icon={<Ionicons name="color-palette-outline" size={24} color={colors.primary} />}
          title={t("theme")}
          value={theme === "light" ? t("light") : theme === "dark" ? t("dark") : t("system")}
          onPress={handleThemeChange}
        />
        <SettingsItem
          icon={<Ionicons name="notifications-outline" size={24} color={colors.primary} />}
          title={t("notifications")}
          isSwitch
          switchValue={true}
          onSwitchChange={() => {}}
        />
      </SettingsSection>

      <SettingsSection title={t("about")}>
        <SettingsItem
          icon={<Ionicons name="information-circle-outline" size={24} color={colors.primary} />}
          title={t("appVersion")}
          value="1.0.0"
        />
        <SettingsItem
          icon={<Ionicons name="shield-checkmark-outline" size={24} color={colors.primary} />}
          title={t("privacyPolicy")}
          onPress={() => {}}
        />
        <SettingsItem
          icon={<Ionicons name="document-text-outline" size={24} color={colors.primary} />}
          title={t("termsOfService")}
          onPress={() => {}}
        />
      </SettingsSection>

      <SettingsSection>
        <SettingsItem
          icon={<Ionicons name="log-out-outline" size={24} color={colors.error} />}
          title={t("logout")}
          titleStyle={{ color: colors.error }}
          onPress={handleLogout}
        />
      </SettingsSection>
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
})
