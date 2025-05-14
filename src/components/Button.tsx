"use client"

import React from "react"
import { TouchableOpacity, StyleSheet, ActivityIndicator, type ViewStyle, type TextStyle, View } from "react-native"
import { useTheme } from "../contexts/ThemeContext"
import { Text } from "./Text"

interface ButtonProps {
  title: string
  onPress: () => void
  disabled?: boolean
  loading?: boolean
  icon?: React.ReactNode
  style?: ViewStyle
  textStyle?: TextStyle
  variant?: "primary" | "secondary" | "outline"
}

export const Button = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
  variant = "primary",
}: ButtonProps) => {
  const { colors } = useTheme()

  const getBackgroundColor = () => {
    if (disabled) return colors.secondary + "50"

    switch (variant) {
      case "primary":
        return colors.primary
      case "secondary":
        return colors.secondary
      case "outline":
        return "transparent"
      default:
        return colors.primary
    }
  }

  const getBorderColor = () => {
    if (variant === "outline") {
      return disabled ? colors.secondary + "50" : colors.primary
    }
    return "transparent"
  }

  const getTextColor = () => {
    if (disabled) return colors.secondary

    switch (variant) {
      case "primary":
      case "secondary":
        return "#FFFFFF"
      case "outline":
        return colors.primary
      default:
        return "#FFFFFF"
    }
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === "outline" ? 1 : 0,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <React.Fragment>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={[styles.text, { color: getTextColor() }, textStyle]}>{title}</Text>
        </React.Fragment>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  iconContainer: {
    marginRight: 8,
  },
})
