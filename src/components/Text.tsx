"use client"

import type React from "react"
import { Text as RNText, type TextProps as RNTextProps, StyleSheet } from "react-native"
import { useLanguage } from "../contexts/LanguageContext"
import { useTheme } from "../contexts/ThemeContext"

interface TextProps extends RNTextProps {
  children: React.ReactNode
}

export const Text = ({ style, children, ...props }: TextProps) => {
  const { isRTL } = useLanguage()
  const { colors } = useTheme()

  return (
    <RNText style={[styles.text, { color: colors.text, textAlign: isRTL ? "right" : "left" }, style]} {...props}>
      {children}
    </RNText>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
})
