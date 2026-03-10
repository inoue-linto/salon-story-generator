"use client";

import React from "react";
import { type StoryData, MENU_OPTIONS } from "./StoryPreview";
import { themes } from "@/themes";

type Props = {
  data: StoryData;
  onChange: (data: StoryData) => void;
};

const TIME_OPTIONS = (() => {
  const times: string[] = [];
  for (let h = 11; h <= 18; h++) {
    for (let m = 0; m < 60; m += 15) {
      if (h === 18 && m > 45) break;
      times.push(`${h}:${m.toString().padStart(2, "0")}`);
    }
  }
  return times;
})();

export default function StoryForm({ data, onChange }: Props) {
  const update = (partial: Partial<StoryData>) => {
    onChange({ ...data, ...partial });
  };

  const updateTimeSlot = (index: number, value: string) => {
    const newSlots = [...data.timeSlots];
    newSlots[index] = value;
    update({ timeSlots: newSlots });
  };

  const addTimeSlot = () => {
    if (data.timeSlots.length < 5) {
      update({ timeSlots: [...data.timeSlots, ""] });
    }
  };

  const removeTimeSlot = (index: number) => {
    if (data.timeSlots.length > 1) {
      update({ timeSlots: data.timeSlots.filter((_, i) => i !== index) });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-warm-brown">空き情報を入力</h2>

      {/* Theme */}
      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-2">
          背景デザイン
        </label>
        <select
          value={data.themeId}
          onChange={(e) => update({ themeId: e.target.value })}
          className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-foreground outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all appearance-none cursor-pointer"
        >
          {themes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.emoji} {t.name}
            </option>
          ))}
        </select>
      </div>

      {/* Store name */}
      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-2">
          店舗名
        </label>
        <select
          value={data.storeName}
          onChange={(e) => update({ storeName: e.target.value })}
          className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-foreground outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all appearance-none cursor-pointer"
        >
          <option value="">選択してください</option>
          <option value="florasKIN 銀座Blanc店">florasKIN 銀座Blanc店</option>
          <option value="florasKIN 銀座Miel店">florasKIN 銀座Miel店</option>
          <option value="florasKIN 上野店">florasKIN 上野店</option>
          <option value="florasKIN 恵比寿Leclat店">florasKIN 恵比寿Leclat店</option>
          <option value="florasKIN 恵比寿Amour店">florasKIN 恵比寿Amour店</option>
        </select>
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-2">
          日付
        </label>
        <input
          type="text"
          value={data.date}
          onChange={(e) => update({ date: e.target.value })}
          placeholder="例: 3/10"
          className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-foreground outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all"
        />
      </div>

      {/* Time slots */}
      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-2">
          空き時間
        </label>
        <div className="space-y-3">
          {data.timeSlots.map((slot, i) => (
            <div key={i} className="flex gap-2 items-center">
              <select
                value={slot}
                onChange={(e) => updateTimeSlot(i, e.target.value)}
                className="flex-1 rounded-xl border border-beige bg-white px-4 py-3 text-foreground outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all appearance-none cursor-pointer"
              >
                <option value="">時間を選択</option>
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={`${t}〜`}>
                    {t}〜
                  </option>
                ))}
              </select>
              {data.timeSlots.length > 1 && (
                <button
                  onClick={() => removeTimeSlot(i)}
                  className="w-10 h-10 rounded-full border border-beige text-foreground/40 hover:text-red-400 hover:border-red-200 flex items-center justify-center transition-all cursor-pointer"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
        {data.timeSlots.length < 5 && (
          <button
            onClick={addTimeSlot}
            className="mt-3 text-sm text-sage-dark hover:text-sage font-medium transition-colors cursor-pointer"
          >
            + 時間枠を追加
          </button>
        )}
      </div>

      {/* Menu items */}
      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-2">
          メニュー
        </label>
        <div className="flex flex-wrap gap-2">
          {MENU_OPTIONS.map((item) => {
            const selected = (data.menuItems ?? []).includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => {
                  const current = data.menuItems ?? [];
                  const newItems = selected
                    ? current.filter((m) => m !== item)
                    : [...current, item];
                  update({ menuItems: newItems });
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer ${
                  selected
                    ? "bg-sage text-white border-sage"
                    : "bg-white text-foreground/60 border-beige hover:border-sage/40"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* Comment */}
      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-2">
          コメント
        </label>
        <textarea
          value={data.comment ?? ""}
          onChange={(e) => update({ comment: e.target.value })}
          placeholder={"例: 当日予約OK！お気軽にどうぞ"}
          rows={3}
          className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-foreground outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all resize-none"
        />
      </div>
    </div>
  );
}
