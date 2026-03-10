"use client";

import React from "react";
import { getThemeById, type Theme } from "@/themes";

export const MENU_OPTIONS = ["毛穴洗浄", "肌質改善", "フェイシャルワックス"] as const;

export type StoryData = {
  storeName: string;
  date: string;
  timeSlots: string[];
  menuItems: string[];
  comment: string;
  themeId: string;
};

type Props = {
  data: StoryData;
  previewRef: React.RefObject<HTMLDivElement | null>;
};

export default function StoryPreview({ data, previewRef }: Props) {
  const { storeName, date, timeSlots, menuItems = [], comment = "", themeId } = data;
  const theme = getThemeById(themeId);

  const filledSlots = timeSlots.filter((t) => t);
  const hasMultipleSlots = filledSlots.length > 2;
  const hasMenuOrComment = menuItems.length > 0 || comment;

  return (
    <div
      ref={previewRef}
      style={{
        width: 1080,
        height: 1920,
        fontFamily: "'Noto Sans JP', sans-serif",
        background: theme.background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorations */}
      <TopDecoration theme={theme} />
      <ScatteredDots theme={theme} />

      {/* Content layout */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          width: "100%",
          paddingTop: 260,
          paddingBottom: 200,
          zIndex: 1,
        }}
      >
        {/* Store name */}
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          {renderStoreName(storeName, theme)}
        </div>

        {/* Main card */}
        <div
          style={{
            background: theme.cardBg,
            borderRadius: 36,
            padding: hasMenuOrComment ? "48px 64px 44px" : "56px 64px 52px",
            width: 840,
            textAlign: "center",
            boxShadow: "0 8px 40px rgba(0, 0, 0, 0.03), 0 2px 8px rgba(0, 0, 0, 0.02)",
            border: `1.5px solid ${theme.cardBorder}`,
          }}
        >
          {/* Top decorative ornament */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <svg width="120" height="20" viewBox="0 0 120 20" fill="none">
              <line x1="0" y1="10" x2="48" y2="10" stroke={theme.lineColor} strokeWidth="1" opacity="0.4" />
              <circle cx="60" cy="10" r="3" fill={theme.accentColor} opacity="0.5" />
              <circle cx="60" cy="10" r="5.5" stroke={theme.accentColor} strokeWidth="0.8" opacity="0.3" fill="none" />
              <line x1="72" y1="10" x2="120" y2="10" stroke={theme.lineColor} strokeWidth="1" opacity="0.4" />
            </svg>
          </div>

          <div
            style={{
              fontSize: 26,
              letterSpacing: "0.3em",
              color: theme.labelColor,
              fontWeight: 500,
              marginBottom: 32,
            }}
          >
            空きのお知らせ
          </div>

          {/* Date */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: theme.headingColor,
              marginBottom: 8,
              letterSpacing: "0.05em",
            }}
          >
            {date || "0/00"}
          </div>

          {/* Day of week */}
          <div
            style={{
              fontSize: 24,
              color: theme.textColor,
              marginBottom: 36,
              fontWeight: 400,
              letterSpacing: "0.1em",
            }}
          >
            {getDayOfWeek(date)}
          </div>

          {/* Time slots */}
          <div style={{ marginBottom: hasMenuOrComment ? 28 : 16 }}>
            {(filledSlots.length > 0 ? filledSlots : ["00:00〜"]).map(
              (slot, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: hasMultipleSlots ? 40 : 44,
                    fontWeight: 500,
                    color: theme.headingColor,
                    marginBottom: 10,
                    letterSpacing: "0.08em",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 14,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="3.5" fill={theme.dotColor} opacity="0.6" />
                    <circle cx="7" cy="7" r="6" stroke={theme.dotColor} strokeWidth="0.8" opacity="0.25" fill="none" />
                  </svg>
                  {slot}
                </div>
              )
            )}
          </div>

          {/* Divider before menu/comment */}
          {hasMenuOrComment && (
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
              <svg width="140" height="12" viewBox="0 0 140 12" fill="none">
                <line x1="0" y1="6" x2="52" y2="6" stroke={theme.lineColor} strokeWidth="0.8" opacity="0.3" />
                <circle cx="60" cy="6" r="1.5" fill={theme.accentColor} opacity="0.35" />
                <circle cx="70" cy="6" r="2" fill={theme.accentColor} opacity="0.45" />
                <circle cx="80" cy="6" r="1.5" fill={theme.accentColor} opacity="0.35" />
                <line x1="88" y1="6" x2="140" y2="6" stroke={theme.lineColor} strokeWidth="0.8" opacity="0.3" />
              </svg>
            </div>
          )}

          {/* Menu items - displayed inline with separator */}
          {menuItems.length > 0 && (
            <div
              style={{
                fontSize: 30,
                color: theme.headingColor,
                fontWeight: 500,
                letterSpacing: "0.1em",
                marginBottom: comment ? 16 : 0,
              }}
            >
              {menuItems.join(" / ")}
            </div>
          )}

          {/* Comment */}
          {comment && (
            <div
              style={{
                fontSize: 26,
                color: theme.textColor,
                fontWeight: 400,
                letterSpacing: "0.12em",
                lineHeight: 1.7,
                marginTop: menuItems.length > 0 ? 0 : 0,
              }}
            >
              {comment.split("\n").map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom message */}
        <div
          style={{
            marginTop: 56,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 30,
              color: theme.textColor,
              fontWeight: 300,
              letterSpacing: "0.2em",
            }}
          >
            ご予約おまちしております {theme.emoji}
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <BottomDecoration theme={theme} />
    </div>
  );
}

/* ─── Scattered Decorative Dots ─── */

function ScatteredDots({ theme }: { theme: Theme }) {
  const dots = [
    { top: 160, left: 120, size: 4, opacity: 0.2 },
    { top: 220, left: 200, size: 3, opacity: 0.15 },
    { top: 180, right: 150, size: 5, opacity: 0.18 },
    { top: 260, right: 220, size: 3, opacity: 0.12 },
    { bottom: 350, left: 140, size: 4, opacity: 0.15 },
    { bottom: 400, right: 160, size: 3, opacity: 0.12 },
    { bottom: 320, left: 260, size: 3, opacity: 0.1 },
  ];

  return (
    <>
      {dots.map((dot, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...dot,
            width: dot.size,
            height: dot.size,
            borderRadius: "50%",
            background: theme.accentColor2,
            opacity: dot.opacity,
          }}
        />
      ))}
    </>
  );
}

/* ─── Top Decoration Components ─── */

function TopDecoration({ theme }: { theme: Theme }) {
  const wrap: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
  };

  switch (theme.decoration) {
    case "leaf":
      return (
        <div style={wrap}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", justifyContent: "center", paddingTop: 50 }}>
            <svg width="680" height="240" viewBox="0 0 680 240" fill="none">
              {/* Left branch */}
              <path d="M340 220 Q300 160 240 130 Q180 100 130 50 Q110 30 90 15" stroke={theme.accentColor} strokeWidth="2" fill="none" opacity="0.5" />
              <path d="M240 130 Q220 110 195 105" stroke={theme.accentColor} strokeWidth="1.5" fill="none" opacity="0.35" />
              <path d="M200 115 Q180 95 160 90" stroke={theme.accentColor} strokeWidth="1.2" fill="none" opacity="0.3" />
              <ellipse cx="160" cy="75" rx="38" ry="14" fill={theme.accentColor} opacity="0.18" transform="rotate(-35 160 75)" />
              <ellipse cx="125" cy="52" rx="32" ry="12" fill={theme.accentColor} opacity="0.15" transform="rotate(-42 125 52)" />
              <ellipse cx="200" cy="100" rx="28" ry="10" fill={theme.accentColor} opacity="0.12" transform="rotate(-25 200 100)" />
              <ellipse cx="100" cy="35" rx="25" ry="9" fill={theme.accentColor} opacity="0.12" transform="rotate(-50 100 35)" />
              {/* Right branch */}
              <path d="M340 220 Q380 160 440 130 Q500 100 550 50 Q570 30 590 15" stroke={theme.accentColor} strokeWidth="2" fill="none" opacity="0.5" />
              <path d="M440 130 Q460 110 485 105" stroke={theme.accentColor} strokeWidth="1.5" fill="none" opacity="0.35" />
              <path d="M480 115 Q500 95 520 90" stroke={theme.accentColor} strokeWidth="1.2" fill="none" opacity="0.3" />
              <ellipse cx="520" cy="75" rx="38" ry="14" fill={theme.accentColor} opacity="0.18" transform="rotate(35 520 75)" />
              <ellipse cx="555" cy="52" rx="32" ry="12" fill={theme.accentColor} opacity="0.15" transform="rotate(42 555 52)" />
              <ellipse cx="480" cy="100" rx="28" ry="10" fill={theme.accentColor} opacity="0.12" transform="rotate(25 480 100)" />
              <ellipse cx="580" cy="35" rx="25" ry="9" fill={theme.accentColor} opacity="0.12" transform="rotate(50 580 35)" />
              {/* Center ornament */}
              <circle cx="340" cy="220" r="4" fill={theme.accentColor2} opacity="0.4" />
              <circle cx="340" cy="220" r="8" stroke={theme.accentColor2} strokeWidth="0.8" opacity="0.2" fill="none" />
            </svg>
          </div>
        </div>
      );

    case "frame":
      return (
        <div style={wrap}>
          <div style={{
            position: "absolute", top: 70, left: 90, right: 90, bottom: 70,
            border: `2px solid ${theme.accentColor}`,
            borderRadius: 16,
          }} />
          <div style={{
            position: "absolute", top: 86, left: 106, right: 106, bottom: 86,
            border: `1px solid ${theme.accentColor2}`,
            borderRadius: 12,
          }} />
          {/* Corner ornaments */}
          {[
            { top: 58, left: 78 },
            { top: 58, right: 78 },
            { bottom: 58, left: 78 },
            { bottom: 58, right: 78 },
          ].map((pos, i) => (
            <div key={i} style={{ position: "absolute", ...pos, width: 24, height: 24 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" fill="rgba(255,255,255,0.5)" />
                <circle cx="12" cy="12" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" fill="none" />
              </svg>
            </div>
          ))}
        </div>
      );

    case "bokeh":
      return (
        <div style={wrap}>
          {/* Soft bokeh circles */}
          <div style={{ position: "absolute", top: 100, left: 80, width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.25)", filter: "blur(45px)" }} />
          <div style={{ position: "absolute", top: 250, right: 60, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.2)", filter: "blur(35px)" }} />
          <div style={{ position: "absolute", top: 450, left: 200, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,0.15)", filter: "blur(30px)" }} />
          {/* Leaf branch top-right */}
          <div style={{ position: "absolute", top: 30, right: 30, width: 320, height: 320 }}>
            <svg width="320" height="320" viewBox="0 0 320 320" fill="none">
              <path d="M310 0 Q270 50 245 100 Q220 150 210 200" stroke={theme.accentColor} strokeWidth="1.5" fill="none" opacity="0.35" />
              <path d="M310 0 Q290 30 280 60 Q270 80 265 100" stroke={theme.accentColor} strokeWidth="1.2" fill="none" opacity="0.3" />
              <ellipse cx="270" cy="60" rx="32" ry="12" fill={theme.accentColor} opacity="0.12" transform="rotate(-50 270 60)" />
              <ellipse cx="250" cy="110" rx="30" ry="10" fill={theme.accentColor} opacity="0.1" transform="rotate(-38 250 110)" />
              <ellipse cx="235" cy="155" rx="26" ry="9" fill={theme.accentColor} opacity="0.08" transform="rotate(-28 235 155)" />
              <ellipse cx="290" cy="40" rx="22" ry="8" fill={theme.accentColor} opacity="0.1" transform="rotate(-60 290 40)" />
              {/* Small berries */}
              <circle cx="285" cy="18" r="3" fill={theme.accentColor} opacity="0.18" />
              <circle cx="295" cy="12" r="2.5" fill={theme.accentColor} opacity="0.14" />
              <circle cx="302" cy="22" r="2" fill={theme.accentColor} opacity="0.14" />
              <circle cx="275" cy="8" r="2" fill={theme.accentColor} opacity="0.12" />
            </svg>
          </div>
        </div>
      );

    case "floral":
      return (
        <div style={wrap}>
          {/* Gold specks scattered */}
          {[
            { top: 60, left: 50, s: 5 }, { top: 100, left: 130, s: 4 }, { top: 170, left: 30, s: 3 },
            { top: 140, left: 180, s: 6 }, { top: 80, right: 180, s: 4 }, { top: 210, left: 90, s: 3 },
            { top: 120, right: 250, s: 3 }, { top: 50, left: 220, s: 4 },
          ].map((p, i) => (
            <div key={i} style={{
              position: "absolute", top: p.top, left: "left" in p ? p.left : undefined, right: "right" in p ? p.right : undefined,
              width: p.s, height: p.s, borderRadius: "50%",
              background: theme.accentColor, opacity: 0.25 + (i % 3) * 0.08,
            }} />
          ))}
          {/* Flower cluster top-right */}
          <div style={{ position: "absolute", top: -20, right: -20, width: 440, height: 440 }}>
            <svg width="440" height="440" viewBox="0 0 440 440" fill="none">
              {/* Large petals */}
              <ellipse cx="370" cy="90" rx="55" ry="35" fill="#ddd3c0" opacity="0.4" transform="rotate(-18 370 90)" />
              <ellipse cx="330" cy="65" rx="48" ry="30" fill="#e2daca" opacity="0.35" transform="rotate(-8 330 65)" />
              <ellipse cx="395" cy="140" rx="42" ry="28" fill="#d8ceb8" opacity="0.32" transform="rotate(18 395 140)" />
              <ellipse cx="310" cy="105" rx="38" ry="24" fill="#e0d8c8" opacity="0.3" transform="rotate(-2 310 105)" />
              <ellipse cx="355" cy="150" rx="35" ry="22" fill="#dcd2be" opacity="0.28" transform="rotate(10 355 150)" />
              {/* Leaves */}
              <ellipse cx="270" cy="150" rx="46" ry="13" fill={theme.accentColor2} opacity="0.2" transform="rotate(28 270 150)" />
              <ellipse cx="410" cy="175" rx="38" ry="11" fill={theme.accentColor2} opacity="0.18" transform="rotate(-18 410 175)" />
              <ellipse cx="290" cy="65" rx="32" ry="9" fill={theme.accentColor2} opacity="0.16" transform="rotate(12 290 65)" />
              {/* Flower centers with detail */}
              <circle cx="360" cy="85" r="10" fill={theme.accentColor} opacity="0.25" />
              <circle cx="360" cy="85" r="5" fill={theme.accentColor} opacity="0.15" />
              <circle cx="325" cy="62" r="8" fill={theme.accentColor} opacity="0.2" />
            </svg>
          </div>
        </div>
      );

    case "water":
      return (
        <div style={wrap}>
          {/* Gold line at top */}
          <div style={{ position: "absolute", top: 110, left: "50%", transform: "translateX(-50%)", width: 220, height: 1.5, background: theme.accentColor, opacity: 0.45, borderRadius: 1 }} />
          {/* Water ripple circles */}
          <svg style={{ position: "absolute", bottom: 180, right: 100 }} width="240" height="240" viewBox="0 0 240 240" fill="none">
            <circle cx="120" cy="120" r="25" stroke={theme.accentColor} strokeWidth="0.8" opacity="0.12" fill="none" />
            <circle cx="120" cy="120" r="50" stroke={theme.accentColor} strokeWidth="0.6" opacity="0.09" fill="none" />
            <circle cx="120" cy="120" r="78" stroke={theme.accentColor} strokeWidth="0.5" opacity="0.06" fill="none" />
            <circle cx="120" cy="120" r="108" stroke={theme.accentColor} strokeWidth="0.4" opacity="0.04" fill="none" />
          </svg>
          {/* Light caustic effects */}
          <div style={{ position: "absolute", top: 280, left: 60, width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.12)", filter: "blur(50px)" }} />
          <div style={{ position: "absolute", top: 550, right: 80, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.1)", filter: "blur(40px)" }} />
          <div style={{ position: "absolute", bottom: 400, left: 300, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.08)", filter: "blur(35px)" }} />
        </div>
      );
  }
}

/* ─── Bottom Decoration ─── */

function BottomDecoration({ theme }: { theme: Theme }) {
  const wrap: React.CSSProperties = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 240,
    pointerEvents: "none",
  };

  switch (theme.decoration) {
    case "leaf":
      return (
        <div style={{ ...wrap, display: "flex", justifyContent: "center", alignItems: "flex-end", paddingBottom: 35 }}>
          <svg width="560" height="160" viewBox="0 0 560 160" fill="none">
            <path d="M280 10 Q230 60 170 85 Q110 110 60 135 Q40 145 20 150" stroke={theme.accentColor} strokeWidth="2" fill="none" opacity="0.4" />
            <ellipse cx="120" cy="105" rx="35" ry="12" fill={theme.accentColor} opacity="0.15" transform="rotate(22 120 105)" />
            <ellipse cx="70" cy="130" rx="28" ry="10" fill={theme.accentColor} opacity="0.12" transform="rotate(28 70 130)" />
            <path d="M280 10 Q330 60 390 85 Q450 110 500 135 Q520 145 540 150" stroke={theme.accentColor} strokeWidth="2" fill="none" opacity="0.4" />
            <ellipse cx="440" cy="105" rx="35" ry="12" fill={theme.accentColor} opacity="0.15" transform="rotate(-22 440 105)" />
            <ellipse cx="490" cy="130" rx="28" ry="10" fill={theme.accentColor} opacity="0.12" transform="rotate(-28 490 130)" />
            {/* Center ornament */}
            <circle cx="280" cy="10" r="3" fill={theme.accentColor2} opacity="0.35" />
          </svg>
        </div>
      );

    case "frame":
      return null;

    case "bokeh":
      return (
        <div style={wrap}>
          <div style={{ position: "absolute", bottom: 30, left: 100, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.18)", filter: "blur(40px)" }} />
          <div style={{ position: "absolute", bottom: 80, right: 150, width: 150, height: 150, borderRadius: "50%", background: "rgba(255,255,255,0.12)", filter: "blur(30px)" }} />
        </div>
      );

    case "floral":
      return (
        <div style={wrap}>
          {/* Gold specks bottom */}
          {[
            { bottom: 180, left: 20, s: 5 }, { bottom: 140, left: 90, s: 4 }, { bottom: 210, left: 60, s: 3 },
            { bottom: 160, left: 150, s: 5 }, { bottom: 120, left: 200, s: 3 },
          ].map((p, i) => (
            <div key={i} style={{
              position: "absolute", bottom: p.bottom, left: p.left,
              width: p.s, height: p.s, borderRadius: "50%",
              background: theme.accentColor, opacity: 0.25 + (i % 3) * 0.08,
            }} />
          ))}
          {/* Flower cluster bottom-left */}
          <div style={{ position: "absolute", bottom: -30, left: -30, width: 440, height: 380 }}>
            <svg width="440" height="380" viewBox="0 0 440 380" fill="none">
              <ellipse cx="90" cy="290" rx="55" ry="35" fill="#ddd3c0" opacity="0.4" transform="rotate(18 90 290)" />
              <ellipse cx="130" cy="310" rx="48" ry="30" fill="#e2daca" opacity="0.35" transform="rotate(8 130 310)" />
              <ellipse cx="55" cy="245" rx="42" ry="28" fill="#d8ceb8" opacity="0.32" transform="rotate(-18 55 245)" />
              <ellipse cx="150" cy="270" rx="38" ry="24" fill="#e0d8c8" opacity="0.3" transform="rotate(2 150 270)" />
              <ellipse cx="105" cy="335" rx="35" ry="22" fill="#dcd2be" opacity="0.28" transform="rotate(-10 105 335)" />
              {/* Leaves */}
              <ellipse cx="195" cy="240" rx="46" ry="13" fill={theme.accentColor2} opacity="0.2" transform="rotate(-28 195 240)" />
              <ellipse cx="30" cy="215" rx="38" ry="11" fill={theme.accentColor2} opacity="0.18" transform="rotate(18 30 215)" />
              {/* Flower centers */}
              <circle cx="100" cy="285" r="10" fill={theme.accentColor} opacity="0.25" />
              <circle cx="100" cy="285" r="5" fill={theme.accentColor} opacity="0.15" />
              <circle cx="135" cy="305" r="8" fill={theme.accentColor} opacity="0.2" />
            </svg>
          </div>
        </div>
      );

    case "water":
      return (
        <div style={wrap}>
          <div style={{ position: "absolute", bottom: 90, left: "50%", transform: "translateX(-50%)", width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.08)", filter: "blur(30px)" }} />
        </div>
      );
  }
}

/* ─── Helper Functions ─── */

function renderStoreName(storeName: string, theme: Theme) {
  const name = storeName || "サロン名";
  const baseStyle: React.CSSProperties = {
    fontSize: 54,
    letterSpacing: "0.3em",
    color: theme.textColor,
    fontWeight: 500,
  };

  if (name.startsWith("florasKIN ")) {
    const rest = name.slice("florasKIN ".length);
    return (
      <div style={baseStyle}>
        <div>florasKIN</div>
        <div style={{ marginTop: 10 }}>{rest}</div>
      </div>
    );
  }

  return <div style={baseStyle}>{name}</div>;
}

function getDayOfWeek(dateStr: string): string {
  if (!dateStr) return "";
  const now = new Date();
  const year = now.getFullYear();
  const match = dateStr.match(/(\d+)\s*[/\-月]\s*(\d+)/);
  if (!match) return "";
  const month = parseInt(match[1], 10);
  const day = parseInt(match[2], 10);
  const d = new Date(year, month - 1, day);
  if (isNaN(d.getTime())) return "";
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  return `(${days[d.getDay()]}曜日)`;
}
