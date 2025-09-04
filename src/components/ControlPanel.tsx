"use client";

import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Type,
  Palette,
  Sparkles,
  Download,
  Settings,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
} from "lucide-react";
import type { HeadlineSettings } from "../types";
import { ColorPicker } from "./ColorPicker";
import { RangeSlider } from "./RangeSlider";
import { Select } from "./Select";

interface ControlPanelProps {
  settings: HeadlineSettings;
  onSettingsChange: (settings: Partial<HeadlineSettings>) => void;
  onExport: () => void;
}

const FONT_FAMILIES = [
  { value: "Inter", label: "Inter" },
  { value: "Poppins", label: "Poppins" },
  { value: "Roboto", label: "Roboto" },
  { value: "Montserrat", label: "Montserrat" },
  { value: "Playfair Display", label: "Playfair Display" },
  { value: "Merriweather", label: "Merriweather" },
  { value: "Source Code Pro", label: "Source Code Pro" },
];

const FONT_WEIGHTS = [
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

const TEXT_ALIGN_OPTIONS = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

const GRADIENT_DIRECTIONS = [
  { value: "to-r", label: "Right →" },
  { value: "to-l", label: "Left ←" },
  { value: "to-b", label: "Down ↓" },
  { value: "to-t", label: "Up ↑" },
  { value: "to-br", label: "Bottom Right ↘" },
  { value: "to-bl", label: "Bottom Left ↙" },
];

const ANIMATION_TYPES = [
  { value: "none", label: "None" },
  { value: "fade-in", label: "Fade In" },
  { value: "slide-up", label: "Slide Up" },
  { value: "bounce", label: "Bounce" },
  { value: "glow", label: "Glow" },
  { value: "shimmer", label: "Shimmer" },
  { value: "typewriter", label: "Typewriter" },
];

const HIGHLIGHT_STYLES = [
  { value: "highlight", label: "Highlight" },
  { value: "underline", label: "Underline" },
  { value: "background", label: "Background" },
  { value: "bold", label: "Bold" },
  { value: "italic", label: "Italic" },
];

export const ControlPanel: React.FC<ControlPanelProps> = ({
  settings,
  onSettingsChange,
  onExport,
}) => {
  const [activeSection, setActiveSection] = useState<string>("typography");
  const [newHighlightWord, setNewHighlightWord] = useState("");

  const sections = [
    { id: "typography", label: "Typography", icon: Type },
    { id: "colors", label: "Colors & Gradients", icon: Palette },
    { id: "effects", label: "Effects & Animation", icon: Sparkles },
    { id: "advanced", label: "Advanced", icon: Settings },
  ];

  const addGradientColor = () => {
    onSettingsChange({
      gradientColors: [...settings.gradientColors, "#3b82f6"],
    });
  };

  const updateGradientColor = (index: number, color: string) => {
    const newColors = [...settings.gradientColors];
    newColors[index] = color;
    onSettingsChange({ gradientColors: newColors });
  };

  const removeGradientColor = (index: number) => {
    if (settings.gradientColors.length > 2) {
      const newColors = settings.gradientColors.filter((_, i) => i !== index);
      onSettingsChange({ gradientColors: newColors });
    }
  };

  const addHighlightedWord = () => {
    if (newHighlightWord.trim()) {
      onSettingsChange({
        highlightedWords: [
          ...settings.highlightedWords,
          {
            word: newHighlightWord.trim(),
            style: "highlight",
            backgroundColor: "#ffeb3b",
            color: "#000",
          },
        ],
      });
      setNewHighlightWord("");
    }
  };

  const updateHighlightedWord = (
    index: number,
    updates: Partial<(typeof settings.highlightedWords)[0]>
  ) => {
    const newHighlights = [...settings.highlightedWords];
    newHighlights[index] = { ...newHighlights[index], ...updates };
    onSettingsChange({ highlightedWords: newHighlights });
  };

  const removeHighlightedWord = (index: number) => {
    const newHighlights = settings.highlightedWords.filter(
      (_, i) => i !== index
    );
    onSettingsChange({ highlightedWords: newHighlights });
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Headline Controls
        </h2>
      </div>

      <div className="custom-scrollbar max-h-[600px] overflow-y-auto">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <div
              key={section.id}
              className="border-b border-gray-200 dark:border-gray-700"
            >
              <button
                onClick={() => setActiveSection(isActive ? "" : section.id)}
                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {section.label}
                  </span>
                </div>
                {isActive ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
              </button>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                      {section.id === "typography" && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Headline Text
                            </label>
                            <textarea
                              value={settings.text}
                              onChange={(e) =>
                                onSettingsChange({ text: e.target.value })
                              }
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                              rows={3}
                              placeholder="Enter your headline text..."
                            />
                          </div>

                          <Select
                            label="Font Family"
                            value={settings.fontFamily}
                            onChange={(value) =>
                              onSettingsChange({ fontFamily: value })
                            }
                            options={FONT_FAMILIES}
                          />

                          <Select
                            label="Font Weight"
                            value={settings.fontWeight.toString()}
                            onChange={(value) =>
                              onSettingsChange({ fontWeight: Number(value) })
                            }
                            options={FONT_WEIGHTS}
                          />

                          <RangeSlider
                            label="Font Size"
                            value={settings.fontSize}
                            onChange={(value) =>
                              onSettingsChange({ fontSize: value })
                            }
                            min={12}
                            max={120}
                            unit="px"
                          />

                          <Select
                            label="Text Alignment"
                            value={settings.textAlign}
                            onChange={(value) =>
                              onSettingsChange({ textAlign: value as any })
                            }
                            options={TEXT_ALIGN_OPTIONS}
                          />

                          <RangeSlider
                            label="Letter Spacing"
                            value={settings.letterSpacing}
                            onChange={(value) =>
                              onSettingsChange({ letterSpacing: value })
                            }
                            min={-5}
                            max={20}
                            step={0.5}
                            unit="px"
                          />

                          <RangeSlider
                            label="Line Height"
                            value={settings.lineHeight}
                            onChange={(value) =>
                              onSettingsChange({ lineHeight: value })
                            }
                            min={0.8}
                            max={3}
                            step={0.1}
                          />
                        </>
                      )}

                      {section.id === "colors" && (
                        <>
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Enable Gradient
                            </label>
                            <button
                              onClick={() =>
                                onSettingsChange({
                                  gradientEnabled: !settings.gradientEnabled,
                                })
                              }
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                settings.gradientEnabled
                                  ? "bg-blue-600"
                                  : "bg-gray-200 dark:bg-gray-700"
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  settings.gradientEnabled
                                    ? "translate-x-6"
                                    : "translate-x-1"
                                }`}
                              />
                            </button>
                          </div>

                          {settings.gradientEnabled ? (
                            <>
                              <Select
                                label="Gradient Direction"
                                value={settings.gradientDirection}
                                onChange={(value) =>
                                  onSettingsChange({
                                    gradientDirection: value as any,
                                  })
                                }
                                options={GRADIENT_DIRECTIONS}
                              />

                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Gradient Colors
                                  </label>
                                  <button
                                    onClick={addGradientColor}
                                    className="p-1 text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                                {settings.gradientColors.map((color, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center space-x-2"
                                  >
                                    <input
                                      type="color"
                                      value={color}
                                      onChange={(e) =>
                                        updateGradientColor(
                                          index,
                                          e.target.value
                                        )
                                      }
                                      className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                                    />
                                    <input
                                      type="text"
                                      value={color}
                                      onChange={(e) =>
                                        updateGradientColor(
                                          index,
                                          e.target.value
                                        )
                                      }
                                      className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                    />
                                    {settings.gradientColors.length > 2 && (
                                      <button
                                        onClick={() =>
                                          removeGradientColor(index)
                                        }
                                        className="p-1 text-red-600 hover:text-red-700"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </>
                          ) : (
                            <ColorPicker
                              label="Text Color"
                              value={settings.color}
                              onChange={(color) => onSettingsChange({ color })}
                            />
                          )}

                          <ColorPicker
                            label="Background Color"
                            value={settings.backgroundColor}
                            onChange={(color) =>
                              onSettingsChange({ backgroundColor: color })
                            }
                          />
                        </>
                      )}

                      {section.id === "effects" && (
                        <>
                          <Select
                            label="Animation Type"
                            value={settings.animationType}
                            onChange={(value) =>
                              onSettingsChange({ animationType: value as any })
                            }
                            options={ANIMATION_TYPES}
                          />

                          {settings.animationType !== "none" && (
                            <>
                              <RangeSlider
                                label="Animation Duration"
                                value={settings.animationDuration}
                                onChange={(value) =>
                                  onSettingsChange({ animationDuration: value })
                                }
                                min={0.1}
                                max={5}
                                step={0.1}
                                unit="s"
                              />

                              <RangeSlider
                                label="Animation Delay"
                                value={settings.animationDelay}
                                onChange={(value) =>
                                  onSettingsChange({ animationDelay: value })
                                }
                                min={0}
                                max={3}
                                step={0.1}
                                unit="s"
                              />
                            </>
                          )}

                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Text Shadow
                            </label>
                            <button
                              onClick={() =>
                                onSettingsChange({
                                  textShadow: !settings.textShadow,
                                })
                              }
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                settings.textShadow
                                  ? "bg-blue-600"
                                  : "bg-gray-200 dark:bg-gray-700"
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  settings.textShadow
                                    ? "translate-x-6"
                                    : "translate-x-1"
                                }`}
                              />
                            </button>
                          </div>

                          {settings.textShadow && (
                            <>
                              <ColorPicker
                                label="Shadow Color"
                                value={settings.shadowColor}
                                onChange={(color) =>
                                  onSettingsChange({ shadowColor: color })
                                }
                              />
                              <RangeSlider
                                label="Shadow Blur"
                                value={settings.shadowBlur}
                                onChange={(value) =>
                                  onSettingsChange({ shadowBlur: value })
                                }
                                min={0}
                                max={50}
                                unit="px"
                              />
                              <RangeSlider
                                label="Shadow Offset X"
                                value={settings.shadowOffsetX}
                                onChange={(value) =>
                                  onSettingsChange({ shadowOffsetX: value })
                                }
                                min={-20}
                                max={20}
                                unit="px"
                              />
                              <RangeSlider
                                label="Shadow Offset Y"
                                value={settings.shadowOffsetY}
                                onChange={(value) =>
                                  onSettingsChange({ shadowOffsetY: value })
                                }
                                min={-20}
                                max={20}
                                unit="px"
                              />
                            </>
                          )}

                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Text Outline
                            </label>
                            <button
                              onClick={() =>
                                onSettingsChange({
                                  textOutline: !settings.textOutline,
                                })
                              }
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                settings.textOutline
                                  ? "bg-blue-600"
                                  : "bg-gray-200 dark:bg-gray-700"
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  settings.textOutline
                                    ? "translate-x-6"
                                    : "translate-x-1"
                                }`}
                              />
                            </button>
                          </div>

                          {settings.textOutline && (
                            <ColorPicker
                              label="Outline Color"
                              value={settings.outlineColor}
                              onChange={(color) =>
                                onSettingsChange({ outlineColor: color })
                              }
                            />
                          )}
                        </>
                      )}

                      {section.id === "advanced" && (
                        <>
                          <RangeSlider
                            label="Padding"
                            value={settings.padding}
                            onChange={(value) =>
                              onSettingsChange({ padding: value })
                            }
                            min={0}
                            max={100}
                            unit="px"
                          />

                          <RangeSlider
                            label="Margin"
                            value={settings.margin}
                            onChange={(value) =>
                              onSettingsChange({ margin: value })
                            }
                            min={0}
                            max={100}
                            unit="px"
                          />

                          <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Word Highlighting
                            </label>

                            <div className="flex space-x-2">
                              <input
                                type="text"
                                value={newHighlightWord}
                                onChange={(e) =>
                                  setNewHighlightWord(e.target.value)
                                }
                                placeholder="Word to highlight..."
                                className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                onKeyPress={(e) =>
                                  e.key === "Enter" && addHighlightedWord()
                                }
                              />
                              <button
                                onClick={addHighlightedWord}
                                className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            {settings.highlightedWords.map(
                              (highlight, index) => (
                                <div
                                  key={index}
                                  className="p-3 border border-gray-200 dark:border-gray-600 rounded-md space-y-2"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
                                      "{highlight.word}"
                                    </span>
                                    <button
                                      onClick={() =>
                                        removeHighlightedWord(index)
                                      }
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>

                                  <Select
                                    label="Style"
                                    value={highlight.style}
                                    onChange={(value) =>
                                      updateHighlightedWord(index, {
                                        style: value as any,
                                      })
                                    }
                                    options={HIGHLIGHT_STYLES}
                                  />

                                  {(highlight.style === "highlight" ||
                                    highlight.style === "background") && (
                                    <ColorPicker
                                      label="Background Color"
                                      value={
                                        highlight.backgroundColor || "#ffeb3b"
                                      }
                                      onChange={(color) =>
                                        updateHighlightedWord(index, {
                                          backgroundColor: color,
                                        })
                                      }
                                    />
                                  )}

                                  {highlight.style !== "background" && (
                                    <ColorPicker
                                      label="Text Color"
                                      value={highlight.color || settings.color}
                                      onChange={(color) =>
                                        updateHighlightedWord(index, { color })
                                      }
                                    />
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onExport}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export Settings</span>
        </button>
      </div>
    </div>
  );
};
