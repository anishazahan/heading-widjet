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


export const FONT_FAMILIES = [
  { value: "Inter", label: "Inter" },
  { value: "Poppins", label: "Poppins" },
  { value: "Roboto", label: "Roboto" },
  { value: "Montserrat", label: "Montserrat" },
  { value: "Playfair Display", label: "Playfair Display" },
  { value: "Merriweather", label: "Merriweather" },

];

export const FONT_WEIGHTS = [
  { value: "100", label: "Thin (100)" },
  { value: "200", label: "Extra Light (200)" },
  { value: "300", label: "Light (300)" },
  { value: "400", label: "Regular (400)" },
  { value: "500", label: "Medium (500)" },
  { value: "600", label: "Semi Bold (600)" },
  { value: "700", label: "Bold (700)" },
  { value: "800", label: "Extra Bold (800)" },
  { value: "900", label: "Black (900)" },
];

export const TEXT_ALIGN_OPTIONS = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

export const GRADIENT_DIRECTIONS = [
  { value: "to-r", label: "Right →" },
  { value: "to-l", label: "Left ←" },
  { value: "to-b", label: "Down ↓" },
  { value: "to-t", label: "Up ↑" },
  { value: "to-br", label: "Bottom Right ↘" },
  { value: "to-bl", label: "Bottom Left ↙" },
];

export const ANIMATION_TYPES = [
  { value: "none", label: "None" },
  { value: "fade-in", label: "Fade In" },
  { value: "slide-up", label: "Slide Up" },
  { value: "bounce", label: "Bounce" },
  { value: "glow", label: "Glow" },
  { value: "shimmer", label: "Shimmer" },
  { value: "typewriter", label: "Typewriter" },
];

export const HIGHLIGHT_STYLES = [
  { value: "highlight", label: "Highlight" },
  { value: "underline", label: "Underline" },
  { value: "background", label: "Background" },
  { value: "bold", label: "Bold" },
  { value: "italic", label: "Italic" },
];


export const PRESET_COLORS = [
  "#000000",
  "#ffffff",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#6b7280",
  "#1f2937",
];