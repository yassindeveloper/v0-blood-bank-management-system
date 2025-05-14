"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useLanguage } from "../../contexts/LanguageContext"
import { useTheme } from "../../contexts/ThemeContext"
import { Text } from "../../components/Text"
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import { RadioButton } from "../../components/RadioButton"
import { Dropdown } from "../../components/Dropdown"

export default function AddDonorScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const { t, isRTL } = useLanguage()
  const { colors } = useTheme()

  const donor = route.params?.donor
  const isEditing = !!donor

  const [formData, setFormData] = useState({
    name: donor?.name || "",
    email: donor?.email || "",
    phone: donor?.phone || "",
    address: donor?.address || "",
    bloodType: donor?.bloodType || "",
    dateOfBirth: donor?.dateOfBirth ? new Date(donor.dateOfBirth) : new Date(),
    gender: donor?.gender || "male",
    weight: donor?.weight?.toString() || "",
  })

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const bloodTypes = [
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
  ]

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false)
    if (selectedDate) {
      setFormData((prev) => ({ ...prev, dateOfBirth: selectedDate }))
    }
  }

  const handleSubmit = () => {
    // Validate form
    if (!formData.name || !formData.phone || !formData.bloodType) {
      Alert.alert(t("error"), t("pleaseCompleteRequiredFields"))
      return
    }

    setIsSubmitting(true)

    // In a real app, you would call your API to save the donor
    setTimeout(() => {
      setIsSubmitting(false)
      Alert.alert(t("success"), isEditing ? t("donorUpdated") : t("donorAdded"), [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ])
    }, 1000)
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.formContainer}>
          <Input
            label={t("fullName")}
            placeholder={t("fullNamePlaceholder")}
            value={formData.name}
            onChangeText={(text) => handleChange("name", text)}
            isRTL={isRTL}
            required
          />

          <Input
            label={t("email")}
            placeholder={t("emailPlaceholder")}
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
            isRTL={isRTL}
          />

          <Input
            label={t("phone")}
            placeholder={t("phonePlaceholder")}
            value={formData.phone}
            onChangeText={(text) => handleChange("phone", text)}
            keyboardType="phone-pad"
            isRTL={isRTL}
            required
          />

          <Dropdown
            label={t("bloodType")}
            placeholder={t("selectBloodType")}
            items={bloodTypes}
            value={formData.bloodType}
            onValueChange={(value) => handleChange("bloodType", value)}
            required
          />

          <View style={styles.datePickerContainer}>
            <Text style={[styles.label, { color: colors.text }]}>{t("dateOfBirth")}</Text>
            <TouchableOpacity
              style={[
                styles.datePickerButton,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={{ color: colors.text }}>{formData.dateOfBirth.toLocaleDateString()}</Text>
              <Ionicons name="calendar-outline" size={20} color={colors.secondary} />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={formData.dateOfBirth}
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            )}
          </View>

          <View style={styles.genderContainer}>
            <Text style={[styles.label, { color: colors.text }]}>{t("gender")}</Text>
            <View style={styles.radioGroup}>
              <RadioButton
                label={t("male")}
                value="male"
                selected={formData.gender === "male"}
                onSelect={() => handleChange("gender", "male")}
              />
              <RadioButton
                label={t("female")}
                value="female"
                selected={formData.gender === "female"}
                onSelect={() => handleChange("gender", "female")}
              />
            </View>
          </View>

          <Input
            label={t("weight")}
            placeholder={t("weightPlaceholder")}
            value={formData.weight}
            onChangeText={(text) => handleChange("weight", text)}
            keyboardType="numeric"
            isRTL={isRTL}
          />

          <Input
            label={t("address")}
            placeholder={t("addressPlaceholder")}
            value={formData.address}
            onChangeText={(text) => handleChange("address", text)}
            multiline
            numberOfLines={3}
            isRTL={isRTL}
          />

          <Button
            title={isSubmitting ? t("loading") : isEditing ? t("update") : t("save")}
            onPress={handleSubmit}
            disabled={isSubmitting}
            style={styles.submitButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  formContainer: {
    width: "100%",
  },
  datePickerContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  datePickerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  genderContainer: {
    marginBottom: 16,
  },
  radioGroup: {
    flexDirection: "row",
    marginTop: 8,
  },
  submitButton: {
    marginTop: 24,
    marginBottom: 24,
  },
})
