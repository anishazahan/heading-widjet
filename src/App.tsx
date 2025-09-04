"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, RotateCcw, Save, Folder } from "lucide-react";
import type { HeadlineSettings } from "./types";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Headline Widget
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Professional Typography Tool
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                // onClick={() => setShowSavedList(!showSavedList)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                title="Saved Headlines"
              >
                <Folder className="w-5 h-5" />
              </button>

              <button
                // onClick={saveCurrentSettings}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                title="Save Current Settings"
              >
                <Save className="w-5 h-5" />
              </button>

              <button
                // onClick={resetSettings}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                title="Reset to Default"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
