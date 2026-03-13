export type Theme = {
  id: string;
  name: string;
  /** Path to background image in public/backgrounds/ */
  backgroundImage: string;
  /** Card styling */
  cardBg: string;
  cardBorder: string;
  /** Text colors */
  textColor: string;
  headingColor: string;
  labelColor: string;
  /** Decorative colors */
  accentColor: string;
  dotColor: string;
  lineColor: string;
  /** Emoji for bottom message */
  emoji: string;
};

/**
 * To add a new theme:
 * 1. Place an image (1080x1920 recommended) in public/backgrounds/
 * 2. Add an entry below with the filename
 */
export const themes: Theme[] = [
  {
    id: "sample",
    name: "サンプル",
    backgroundImage: "/backgrounds/sample.jpg",
    cardBg: "rgba(255, 255, 255, 0.88)",
    cardBorder: "rgba(180, 170, 155, 0.2)",
    textColor: "#8b7355",
    headingColor: "#4a3f33",
    labelColor: "#9aad8e",
    accentColor: "#9aad8e",
    dotColor: "#9aad8e",
    lineColor: "#9aad8e",
    emoji: "🌿",
  },
];

export function getThemeById(id: string): Theme {
  return themes.find((t) => t.id === id) ?? themes[0];
}
