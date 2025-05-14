import Svg, { Path } from "react-native-svg"

interface BloodDropIconProps {
  size?: number
  color?: string
}

export const BloodDropIcon = ({ size = 24, color = "#DC2626" }: BloodDropIconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2v7.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M5 10c-1.5 1.26-2 5-2 7 0 3.31 2.69 6 6 6h6c3.31 0 6-2.69 6-6 0-2-.5-5.74-2-7l-7-8Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
