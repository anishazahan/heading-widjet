import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Download } from "lucide-react";
import type { HeadlineSettings, ExportFormat } from "../types";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: HeadlineSettings;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  settings,
}) => {
  const [activeTab, setActiveTab] = useState<keyof ExportFormat>("json");
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const generateExports = (): ExportFormat => {
    const cssStyles = `
.headline {
  font-size: ${settings.fontSize}px;
  font-family: '${settings.fontFamily}', sans-serif;
  font-weight: ${settings.fontWeight};
  text-align: ${settings.textAlign};
  letter-spacing: ${settings.letterSpacing}px;
  line-height: ${settings.lineHeight};
  padding: ${settings.padding}px;
  margin: ${settings.margin}px;
  ${
    settings.gradientEnabled
      ? `background: linear-gradient(${settings.gradientDirection.replace(
          "to-",
          "to "
        )}, ${settings.gradientColors.join(", ")});
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;`
      : `color: ${settings.color};`
  }
  ${
    settings.backgroundColor !== "transparent"
      ? `background-color: ${settings.backgroundColor};`
      : ""
  }
  ${
    settings.textShadow
      ? `text-shadow: ${settings.shadowOffsetX}px ${settings.shadowOffsetY}px ${settings.shadowBlur}px ${settings.shadowColor};`
      : ""
  }
  ${
    settings.textOutline
      ? `-webkit-text-stroke: 2px ${settings.outlineColor};`
      : ""
  }
}

${
  settings.animationType !== "none"
    ? `
.headline {
  animation: ${settings.animationType} ${
        settings.animationDuration
      }s ease-in-out ${settings.animationDelay}s;
}

@keyframes ${settings.animationType} {
  ${
    settings.animationType === "fade-in"
      ? `
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  `
      : ""
  }
  ${
    settings.animationType === "slide-up"
      ? `
    from { opacity: 0; transform: translateY(50px); }
    to { opacity: 1; transform: translateY(0); }
  `
      : ""
  }
  ${
    settings.animationType === "glow"
      ? `
    0% { text-shadow: 0 0 5px currentColor; }
    100% { text-shadow: 0 0 20px currentColor, 0 0 30px currentColor; }
  `
      : ""
  }
}`
    : ""
}
    `.trim();

    const htmlCode = `
<h1 class="headline">${settings.text}</h1>

<style>
${cssStyles}
</style>
    `.trim();

    const reactCode = `
import React from 'react';
import { motion } from 'framer-motion';

const Headline = () => {
  const style = {
    fontSize: '${settings.fontSize}px',
    fontFamily: '${settings.fontFamily}, sans-serif',
    fontWeight: ${settings.fontWeight},
    textAlign: '${settings.textAlign}',
    letterSpacing: '${settings.letterSpacing}px',
    lineHeight: ${settings.lineHeight},
    padding: '${settings.padding}px',
    margin: '${settings.margin}px',
    ${
      settings.gradientEnabled
        ? `background: 'linear-gradient(${settings.gradientDirection.replace(
            "to-",
            "to "
          )}, ${settings.gradientColors.join(", ")})',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',`
        : `color: '${settings.color}',`
    }
    ${
      settings.backgroundColor !== "transparent"
        ? `backgroundColor: '${settings.backgroundColor}',`
        : ""
    }
    ${
      settings.textShadow
        ? `textShadow: '${settings.shadowOffsetX}px ${settings.shadowOffsetY}px ${settings.shadowBlur}px ${settings.shadowColor}',`
        : ""
    }
    ${
      settings.textOutline
        ? `WebkitTextStroke: '2px ${settings.outlineColor}',`
        : ""
    }
  };

  return (
    <motion.h1
      style={style}
      initial={{ opacity: 0${
        settings.animationType === "slide-up"
          ? ", y: 50"
          : settings.animationType === "fade-in"
          ? ", y: 20"
          : ""
      } }}
      animate={{ opacity: 1${
        settings.animationType === "slide-up"
          ? ", y: 0"
          : settings.animationType === "fade-in"
          ? ", y: 0"
          : ""
      } }}
      transition={{ duration: ${settings.animationDuration}, delay: ${
      settings.animationDelay
    } }}
    >
      ${settings.text}
    </motion.h1>
  );
};

export default Headline;
    `.trim();

    return {
      json: JSON.stringify(settings, null, 2),
      css: cssStyles,
      html: htmlCode,
      react: reactCode,
    };
  };

  const exports = generateExports();

  const copyToClipboard = async (text: string, tab: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTab(tab);
      setTimeout(() => setCopiedTab(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { key: "json" as const, label: "JSON Settings", extension: "json" },
    { key: "css" as const, label: "CSS Styles", extension: "css" },
    { key: "html" as const, label: "HTML Code", extension: "html" },
    { key: "react" as const, label: "React Component", extension: "tsx" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Export Headline Settings
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex border-b border-gray-200 dark:border-gray-700">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {tabs.find((t) => t.key === activeTab)?.label}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      copyToClipboard(exports[activeTab], activeTab)
                    }
                    className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {copiedTab === activeTab ? (
                      <>
                        <Check className="w-4 h-4 text-green-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() =>
                      downloadFile(
                        exports[activeTab],
                        `headline-${activeTab}.${
                          tabs.find((t) => t.key === activeTab)?.extension
                        }`
                      )
                    }
                    className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 max-h-96 overflow-auto custom-scrollbar">
                <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
                  {exports[activeTab]}
                </pre>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
