export type Theme = {
  id: string;
  name: string;
  backgroundImage: string;
  cardBg: string;
  cardBorder: string;
  textColor: string;
  headingColor: string;
  labelColor: string;
  accentColor: string;
  dotColor: string;
  lineColor: string;
  emoji: string;
};

export const themes: Theme[] = [
  {
    id: "fabric-flower",
    name: "ファブリック",
    backgroundImage: "/backgrounds/fabric-flower.png",
    cardBg: "rgba(255, 255, 255, 0.88)",
    cardBorder: "rgba(200, 180, 160, 0.25)",
    textColor: "#9a8070",
    headingColor: "#5a4a3e",
    labelColor: "#c0a890",
    accentColor: "#c0a890",
    dotColor: "#c0a890",
    lineColor: "#c0a890",
    emoji: "🤍",
  },
  {
    id: "gold-petals",
    name: "ゴールドペタル",
    backgroundImage: "/backgrounds/gold-petals.png",
    cardBg: "rgba(255, 255, 255, 0.85)",
    cardBorder: "rgba(200, 170, 100, 0.2)",
    textColor: "#8a7a65",
    headingColor: "#4a4035",
    labelColor: "#c0a060",
    accentColor: "#c0a060",
    dotColor: "#c0a060",
    lineColor: "#c0a060",
    emoji: "✨",
  },
  {
    id: "silk-glow",
    name: "シルクグロウ",
    backgroundImage: "/backgrounds/silk-glow.png",
    cardBg: "rgba(255, 255, 255, 0.82)",
    cardBorder: "rgba(210, 195, 175, 0.2)",
    textColor: "#8a7e70",
    headingColor: "#4a4440",
    labelColor: "#b8a898",
    accentColor: "#b8a898",
    dotColor: "#b8a898",
    lineColor: "#b8a898",
    emoji: "🌸",
  },
  {
    id: "warm-frame",
    name: "ウォームフレーム",
    backgroundImage: "/backgrounds/warm-frame.png",
    cardBg: "rgba(255, 255, 255, 0.9)",
    cardBorder: "rgba(190, 175, 150, 0.2)",
    textColor: "#8a7e68",
    headingColor: "#4a4438",
    labelColor: "#b0a080",
    accentColor: "#b0a080",
    dotColor: "#b0a080",
    lineColor: "#b0a080",
    emoji: "🌙",
  },
  {
    id: "rainbow-sparkle",
    name: "レインボー",
    backgroundImage: "/backgrounds/rainbow-sparkle.png",
    cardBg: "rgba(255, 255, 255, 0.88)",
    cardBorder: "rgba(180, 160, 200, 0.2)",
    textColor: "#7a7580",
    headingColor: "#4a4550",
    labelColor: "#b0a0c0",
    accentColor: "#b0a0c0",
    dotColor: "#b0a0c0",
    lineColor: "#b0a0c0",
    emoji: "🌈",
  },
];

export function getThemeById(id: string): Theme {
  return themes.find((t) => t.id === id) ?? themes[0];
}
