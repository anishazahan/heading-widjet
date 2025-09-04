"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, RotateCcw, Save, Folder } from "lucide-react";
import type { HeadlineSettings } from "./types";
import { HeadlinePreview } from "./components/HeadlinePreview";
import { ControlPanel } from "./components/ControlPanel";
import { ExportModal } from "./components/ExportModal";
import { useTheme } from "./hooks/useTheme";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { DEFAULT_SETTINGS } from "./lib/common.data";

function App() {
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useLocalStorage<HeadlineSettings>(
    "headline-settings",
    DEFAULT_SETTINGS
  );
  const [savedSettings, setSavedSettings] = useLocalStorage<HeadlineSettings[]>(
    "saved-headlines",
    []
  );
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [showSavedList, setShowSavedList] = useState(false);

  const handleSettingsChange = (newSettings: Partial<HeadlineSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const saveCurrentSettings = () => {
    const timestamp = new Date().toISOString();
    const savedSetting = {
      ...settings,
      id: timestamp,
      name: `Headline ${savedSettings.length + 1}`,
    };
    setSavedSettings((prev) => [...prev, savedSetting]);
  };

  const loadSavedSettings = (savedSetting: HeadlineSettings) => {
    setSettings(savedSetting);
    setShowSavedList(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 ">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <div>
                <h1 className="text-base sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                  Headline Widget
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                  Professional Typography Tool
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={() => setShowSavedList(!showSavedList)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                title="Saved Headlines"
              >
                <Folder className="w-5 h-5" />
              </button>

              <button
                onClick={saveCurrentSettings}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                title="Save Current Settings"
              >
                <Save className="w-5 h-5" />
              </button>

              <button
                onClick={resetSettings}
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

      {/* Saved Settings Dropdown */}
      {showSavedList && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-16 right-4 z-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 min-w-64 max-h-64 overflow-y-auto"
        >
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              Saved Headlines
            </h3>
          </div>
          {savedSettings.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No saved headlines yet
            </div>
          ) : (
            <div className="py-2">
              {savedSettings.map((saved, index) => (
                <button
                  key={index}
                  onClick={() => loadSavedSettings(saved)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="font-medium text-gray-900 dark:text-gray-100 truncate">
                    {saved.text.slice(0, 30)}...
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {saved.fontFamily} • {saved.fontSize}px
                  </div>
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview Area */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <HeadlinePreview settings={settings} />
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {settings.text.length}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Characters
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {settings.text.split(" ").length}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Words
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {settings.fontSize}px
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Font Size
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {settings.highlightedWords.length}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Highlights
                </div>
              </div>
            </motion.div>
          </div>

          {/* Control Panel */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ControlPanel
                settings={settings}
                onSettingsChange={handleSettingsChange}
                onExport={() => setIsExportModalOpen(true)}
              />
            </motion.div>
          </div>
        </div>
      </main>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        settings={settings}
      />

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p>Built with React, TypeScript, Tailwind CSS, and Framer Motion</p>
            <p className="mt-1">Professional Headline Widget • Anisha Zahan</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
