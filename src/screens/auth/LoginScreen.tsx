"use client"

import { useState } from "react"
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { useAuth } from "../../contexts/AuthContext"
import { useLanguage } from "../../contexts/LanguageContext"
import { useTheme } from "../../contexts/ThemeContext"
import { Text } from "../../components/Text"
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import { LanguageSwitcher } from "../../components/LanguageSwitcher"
import { BloodDropIcon } from "../../components/icons/BloodDropIcon"

export default function LoginScreen() {
  const { login } = useAuth()
  const { t, isRTL } = useLanguage()
  const { colors } = useTheme()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async () => {
    if (!username || !password) {
      setError(t("pleaseEnterCredentials"))
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const success = await login(username, password)
      if (!success) {
        setError(t("invalidCredentials"))
      }
    } catch (error) {
      setError(t("loginFailed"))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.languageSwitcherContainer}>
          <LanguageSwitcher />
        </View>

        <View style={styles.logoContainer}>
          <BloodDropIcon size={80} color={colors.primary} />
          <Text style={[styles.title, { color: colors.text }]}>{t("appName")}</Text>
          <Text style={[styles.subtitle, { color: colors.secondary }]}>{t("loginDescription")}</Text>
        </View>

        <View style={styles.formContainer}>
          <Input
            label={t("username")}
            placeholder={t("usernamePlaceholder")}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            isRTL={isRTL}
          />

          <Input
            label={t("password")}
            placeholder={t("passwordPlaceholder")}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            isRTL={isRTL}
          />

          {error ? <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text> : null}

          <Button
            title={isLoading ? t("loading") : t("loginButton")}
            onPress={handleLogin}
            disabled={isLoading}
            style={{ marginTop: 24 }}
          />

          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>{t("forgotPassword")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },
  languageSwitcherContainer: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
  },
  errorText: {
    marginTop: 8,
    textAlign: "center",
  },
  forgotPasswordContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  forgotPasswordText: {
    fontSize: 14,
  },
})
