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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <img
        src={theme.backgroundImage}
        alt=""
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

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

          {/* Menu items */}
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
    </div>
  );
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
