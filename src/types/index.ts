export interface HeadlineSettings {
  text: string
  fontSize: number
  fontFamily: string
  fontWeight: number
  textAlign: "left" | "center" | "right"
  color: string
  backgroundColor: string
  padding: number
  margin: number
  letterSpacing: number
  lineHeight: number

  // Gradient settings
  gradientEnabled: boolean
  gradientDirection: "to-r" | "to-l" | "to-b" | "to-t" | "to-br" | "to-bl"
  gradientColors: string[]

  // Effects
  textShadow: boolean
  textOutline: boolean
  outlineColor: string
  shadowColor: string
  shadowBlur: number
  shadowOffsetX: number
  shadowOffsetY: number

  // Animations
  animationType: "none" | "fade-in" | "slide-up" | "bounce" | "glow" | "shimmer" | "typewriter"
  animationDuration: number
  animationDelay: number

  // Word styling
  highlightedWords: Array<{
    word: string
    style: "highlight" | "underline" | "background" | "bold" | "italic"
    color?: string
    backgroundColor?: string
  }>
}

export interface ExportFormat {
  json: string
  css: string
  html: string
  react: string
}
