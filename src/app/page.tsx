"use client";

import { useRef, useState, useCallback } from "react";
import { toPng } from "html-to-image";
import StoryForm from "@/components/StoryForm";
import StoryPreview, { type StoryData } from "@/components/StoryPreview";

const defaultData: StoryData = {
  storeName: "",
  date: "",
  timeSlots: [""],
  menuItems: [],
  comment: "",
  themeId: "sage",
};

export default function Home() {
  const [data, setData] = useState<StoryData>(defaultData);
  const [downloading, setDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (!previewRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(previewRef.current, {
        width: 1080,
        height: 1920,
        pixelRatio: 1,
      });
      const link = document.createElement("a");
      link.download = `salon-story-${data.date.replace(/\//g, "-") || "image"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("画像の生成に失敗しました", err);
    } finally {
      setDownloading(false);
    }
  }, [data.date]);

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-medium text-warm-brown tracking-wider">
            サロン空き情報ストーリー作成
          </h1>
          <p className="text-sm text-foreground/50 mt-2">
            Instagramストーリー用の空きお知らせ画像を作成できます
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left: Form */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-beige/50">
              <StoryForm data={data} onChange={setData} />

              <button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full mt-8 bg-sage hover:bg-sage-dark disabled:opacity-50 text-white font-medium py-3.5 px-6 rounded-xl transition-colors cursor-pointer"
              >
                {downloading ? "生成中..." : "PNGをダウンロード"}
              </button>
            </div>
          </div>

          {/* Right: Preview */}
          <div className="flex-1 flex flex-col items-center">
            <p className="text-sm text-foreground/40 mb-4">プレビュー</p>
            <div
              className="rounded-2xl overflow-hidden shadow-lg border border-beige/30"
              style={{
                width: 360,
                height: 640,
              }}
            >
              <div
                style={{
                  transform: "scale(0.3333)",
                  transformOrigin: "top left",
                  width: 1080,
                  height: 1920,
                }}
              >
                <StoryPreview data={data} previewRef={previewRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
