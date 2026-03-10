export type Theme = {
  id: string;
  name: string;
  background: string;
  accentColor: string;
  accentColor2: string;
  textColor: string;
  headingColor: string;
  labelColor: string;
  cardBg: string;
  cardBorder: string;
  dotColor: string;
  lineColor: string;
  lineGradient: string;
  emoji: string;
  decoration: "leaf" | "frame" | "bokeh" | "floral" | "water";
};

export const themes: Theme[] = [
  {
    id: "sage",
    name: "セージグリーン",
    background: "linear-gradient(170deg, #f7f2eb 0%, #eee8de 35%, #e5ddd0 65%, #ddd3c2 100%)",
    accentColor: "#9aad8e",
    accentColor2: "#c4b898",
    textColor: "#8b7355",
    headingColor: "#4a3f33",
    labelColor: "#9aad8e",
    cardBg: "rgba(255, 255, 255, 0.88)",
    cardBorder: "rgba(154, 173, 142, 0.2)",
    dotColor: "#9aad8e",
    lineColor: "#9aad8e",
    lineGradient: "linear-gradient(90deg, transparent, #c4b898, transparent)",
    emoji: "🌿",
    decoration: "leaf",
  },
  {
    id: "frame",
    name: "フレーム",
    background: "linear-gradient(165deg, #d0dbd6 0%, #dae2dc 30%, #e4dfda 60%, #e0d8ce 100%)",
    accentColor: "rgba(255,255,255,0.7)",
    accentColor2: "rgba(255,255,255,0.4)",
    textColor: "#7a7068",
    headingColor: "#4a4540",
    labelColor: "#9a9088",
    cardBg: "rgba(255, 255, 255, 0.75)",
    cardBorder: "rgba(255,255,255,0.5)",
    dotColor: "#9a9088",
    lineColor: "rgba(255,255,255,0.7)",
    lineGradient: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
    emoji: "✨",
    decoration: "frame",
  },
  {
    id: "bokeh",
    name: "ボケリーフ",
    background: "linear-gradient(175deg, #ece9e5 0%, #e4e1dc 30%, #dddad5 60%, #e6e3df 100%)",
    accentColor: "#bab4ac",
    accentColor2: "#d4cfc8",
    textColor: "#78726a",
    headingColor: "#4a4640",
    labelColor: "#a8a29a",
    cardBg: "rgba(255, 255, 255, 0.8)",
    cardBorder: "rgba(186, 180, 172, 0.15)",
    dotColor: "#a8a29a",
    lineColor: "#bab4ac",
    lineGradient: "linear-gradient(90deg, transparent, #d0cbc4, transparent)",
    emoji: "🍃",
    decoration: "bokeh",
  },
  {
    id: "floral",
    name: "フラワー",
    background: "linear-gradient(175deg, #f5f0ea 0%, #f0ebe5 40%, #ede8e2 70%, #f2ede7 100%)",
    accentColor: "#d4c4a0",
    accentColor2: "#9aad8e",
    textColor: "#8a7e6a",
    headingColor: "#4a4035",
    labelColor: "#9aad8e",
    cardBg: "rgba(255, 255, 255, 0.85)",
    cardBorder: "rgba(212, 196, 160, 0.2)",
    dotColor: "#d4c4a0",
    lineColor: "#d4c4a0",
    lineGradient: "linear-gradient(90deg, transparent, #d4c4a0, transparent)",
    emoji: "💐",
    decoration: "floral",
  },
  {
    id: "water",
    name: "ウォーター",
    background: "linear-gradient(175deg, #f2f4f6 0%, #eaeff2 30%, #f0f3f5 55%, #e8edf0 100%)",
    accentColor: "#c0a870",
    accentColor2: "#d8cdb5",
    textColor: "#78706a",
    headingColor: "#4a4440",
    labelColor: "#c0a870",
    cardBg: "rgba(255, 255, 255, 0.85)",
    cardBorder: "rgba(192, 168, 112, 0.15)",
    dotColor: "#c0a870",
    lineColor: "#c0a870",
    lineGradient: "linear-gradient(90deg, transparent, #c0a870, transparent)",
    emoji: "💧",
    decoration: "water",
  },
];

export function getThemeById(id: string): Theme {
  return themes.find((t) => t.id === id) ?? themes[0];
}
