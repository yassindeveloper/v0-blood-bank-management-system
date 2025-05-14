"use client"

import type React from "react"
import { View, TextInput, StyleSheet, type TextInputProps, type ViewStyle } from "react-native"
import { useTheme } from "../contexts/ThemeContext"
import { Text } from "./Text"

interface InputProps extends TextInputProps {
  label?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  error?: string
  containerStyle?: ViewStyle
  isRTL?: boolean
  required?: boolean
}

export const Input = ({
  label,
  leftIcon,
  rightIcon,
  error,
  containerStyle,
  style,
  isRTL = false,
  required = false,
  ...props
}: InputProps) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
          {required && <Text style={[styles.required, { color: colors.error }]}>*</Text>}
        </View>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.card,
            borderColor: error ? colors.error : colors.border,
            flexDirection: isRTL ? "row-reverse" : "row",
          },
        ]}
      >
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
              textAlign: isRTL ? "right" : "left",
            },
            style,
          ]}
          placeholderTextColor={colors.secondary}
          {...props}
        />
        {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
      </View>
      {error && <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  required: {
    marginLeft: 4,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
  },
  iconContainer: {
    paddingHorizontal: 12,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
})
