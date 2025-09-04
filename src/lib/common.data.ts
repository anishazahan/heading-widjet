import { HeadlineSettings } from "../types";

export const DEFAULT_SETTINGS: HeadlineSettings = {
  text: "Create Amazing Headlines",
  fontSize: 48,
  fontFamily: "Inter",
  fontWeight: 700,
  textAlign: "center",
  color: "#1f2937",
  backgroundColor: "transparent",
  padding: 20,
  margin: 10,
  letterSpacing: 0,
  lineHeight: 1.2,

  gradientEnabled: false,
  gradientDirection: "to-r",
  gradientColors: ["#3b82f6", "#8b5cf6"],

  textShadow: false,
  textOutline: false,
  outlineColor: "#000000",
  shadowColor: "#000000",
  shadowBlur: 4,
  shadowOffsetX: 2,
  shadowOffsetY: 2,

  animationType: "fade-in",
  animationDuration: 0.8,
  animationDelay: 0,

  highlightedWords: [],
};
