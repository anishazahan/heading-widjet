"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { HeadlineSettings } from "../types";

interface HeadlinePreviewProps {
  settings: HeadlineSettings;
}

export const HeadlinePreview: React.FC<HeadlinePreviewProps> = ({
  settings,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Typewriter effect
  useEffect(() => {
    if (settings.animationType === "typewriter") {
      setDisplayText("");
      setCurrentIndex(0);
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev < settings.text.length) {
            setDisplayText(settings.text.slice(0, prev + 1));
            return prev + 1;
          }
          clearInterval(timer);
          return prev;
        });
      }, 100);
      return () => clearInterval(timer);
    } else {
      setDisplayText(settings.text);
    }
  }, [settings.text, settings.animationType]);

  const getAnimationProps = () => {
    const baseProps = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: {
        duration: settings.animationDuration,
        delay: settings.animationDelay,
      },
    };

    switch (settings.animationType) {
      case "fade-in":
        return {
          ...baseProps,
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
        };
      case "slide-up":
        return {
          ...baseProps,
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
        };
      case "bounce":
        return {
          ...baseProps,
          animate: {
            opacity: 1,
            y: [0, -10, 0],
            transition: {
              duration: settings.animationDuration,
              delay: settings.animationDelay,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 2,
            },
          },
        };
      default:
        return baseProps;
    }
  };

  const getGradientClass = () => {
    if (!settings.gradientEnabled) return "";

    const direction = settings.gradientDirection;
    const colors = settings.gradientColors.join(", ");

    return `bg-gradient-${direction}`;
  };

  const getTextStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {
      fontSize: `${settings.fontSize}px`,
      fontFamily: settings.fontFamily,
      fontWeight: settings.fontWeight,
      textAlign: settings.textAlign,
      letterSpacing: `${settings.letterSpacing}px`,
      lineHeight: settings.lineHeight,
      padding: `${settings.padding}px`,
      margin: `${settings.margin}px`,
    };

    if (settings.gradientEnabled) {
      style.background = `linear-gradient(${settings.gradientDirection.replace(
        "to-",
        "to "
      )}, ${settings.gradientColors.join(", ")})`;
      style.backgroundClip = "text";
      style.WebkitBackgroundClip = "text";
      style.WebkitTextFillColor = "transparent";
      style.backgroundSize = "200% 200%";
    } else {
      style.color = settings.color;
    }

    if (
      settings.backgroundColor &&
      settings.backgroundColor !== "transparent"
    ) {
      style.backgroundColor = settings.backgroundColor;
    }

    if (settings.textShadow) {
      style.textShadow = `${settings.shadowOffsetX}px ${settings.shadowOffsetY}px ${settings.shadowBlur}px ${settings.shadowColor}`;
    }

    if (settings.textOutline) {
      style.WebkitTextStroke = `2px ${settings.outlineColor}`;
    }

    return style;
  };

  const processTextWithHighlights = (text: string) => {
    if (settings.highlightedWords.length === 0) {
      return <span>{text}</span>;
    }

    const processedText = text;
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    settings.highlightedWords.forEach((highlight, index) => {
      const wordIndex = processedText
        .toLowerCase()
        .indexOf(highlight.word.toLowerCase(), lastIndex);
      if (wordIndex !== -1) {
        // Add text before the highlighted word
        if (wordIndex > lastIndex) {
          elements.push(
            <span key={`text-${index}`}>
              {processedText.slice(lastIndex, wordIndex)}
            </span>
          );
        }

        // Add the highlighted word
        const highlightStyle: React.CSSProperties = {};

        switch (highlight.style) {
          case "highlight":
            highlightStyle.backgroundColor =
              highlight.backgroundColor || "#ffeb3b";
            highlightStyle.color = highlight.color || "#000";
            break;
          case "underline":
            highlightStyle.textDecoration = "underline";
            highlightStyle.textDecorationColor =
              highlight.color || settings.color;
            break;
          case "background":
            highlightStyle.backgroundColor =
              highlight.backgroundColor || "#e3f2fd";
            highlightStyle.padding = "2px 4px";
            highlightStyle.borderRadius = "4px";
            break;
          case "bold":
            highlightStyle.fontWeight = "bold";
            if (highlight.color) highlightStyle.color = highlight.color;
            break;
          case "italic":
            highlightStyle.fontStyle = "italic";
            if (highlight.color) highlightStyle.color = highlight.color;
            break;
        }

        elements.push(
          <span key={`highlight-${index}`} style={highlightStyle}>
            {processedText.slice(wordIndex, wordIndex + highlight.word.length)}
          </span>
        );

        lastIndex = wordIndex + highlight.word.length;
      }
    });

    // Add remaining text
    if (lastIndex < processedText.length) {
      elements.push(
        <span key="remaining">{processedText.slice(lastIndex)}</span>
      );
    }

    return <>{elements}</>;
  };

  const getAnimationClass = () => {
    switch (settings.animationType) {
      case "glow":
        return "animate-glow";
      case "shimmer":
        return "animate-shimmer shimmer-effect";
      default:
        return "";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[300px] p-8 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
      <motion.h1
        {...getAnimationProps()}
        style={getTextStyle()}
        className={`${getAnimationClass()} break-words max-w-full`}
      >
        {settings.animationType === "typewriter" ? (
          <>
            {displayText}
            <span className="animate-pulse">|</span>
          </>
        ) : (
          processTextWithHighlights(displayText)
        )}
      </motion.h1>
    </div>
  );
};
