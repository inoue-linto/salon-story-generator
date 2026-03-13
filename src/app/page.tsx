"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { toPng } from "html-to-image";
import StoryForm from "@/components/StoryForm";
import StoryPreview, { type StoryData } from "@/components/StoryPreview";


import { themes, getThemeById } from "@/themes";

const defaultData: StoryData = {
  storeName: "",
  date: "",
  timeSlots: [""],
  menuItems: [],
  comment: "",
  themeId: "fabric-flower",
};

export default function Home() {
  const [data, setData] = useState<StoryData>(defaultData);
  const [sendingDiscord, setSendingDiscord] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [bgBlobUrls, setBgBlobUrls] = useState<Record<string, string>>({});

  // Preload all background images as Blob Object URLs on mount
  // Blob URLs are same-origin, so html-to-image can fetch & inline them (avoids Vercel CDN CORS issues)
  useEffect(() => {
    let urls: string[] = [];
    const load = async () => {
      const entries: Record<string, string> = {};
      await Promise.all(
        themes.map(async (t) => {
          try {
            const res = await fetch(t.backgroundImage);
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            entries[t.id] = url;
            urls.push(url);
          } catch {
            // fallback to original URL
          }
        })
      );
      setBgBlobUrls(entries);
    };
    load();
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const generateImage = useCallback(async () => {
    if (!previewRef.current) return null;

    const theme = getThemeById(data.themeId);
    const bgUrl = bgBlobUrls[data.themeId] || theme.backgroundImage;

    // 1. Load background image into an Image element
    const bgImg = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("背景画像の読み込み失敗"));
      img.src = bgUrl;
    });

    // 2. Capture text/card overlay as transparent PNG (skip the background <img>)
    const overlayDataUrl = await toPng(previewRef.current, {
      width: 1080,
      height: 1920,
      pixelRatio: 1,
      filter: (node: Node) => {
        if (node instanceof HTMLElement && node.dataset.bg === "true") return false;
        return true;
      },
    });

    // 3. Canvas composite: background + overlay → JPEG
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext("2d")!;

    // Draw white base (JPEG has no transparency)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 1080, 1920);

    // Draw background image (object-fit: cover logic)
    const imgR = bgImg.naturalWidth / bgImg.naturalHeight;
    const canvasR = 1080 / 1920;
    let sx = 0, sy = 0, sw = bgImg.naturalWidth, sh = bgImg.naturalHeight;
    if (imgR > canvasR) {
      sw = bgImg.naturalHeight * canvasR;
      sx = (bgImg.naturalWidth - sw) / 2;
    } else {
      sh = bgImg.naturalWidth / canvasR;
      sy = (bgImg.naturalHeight - sh) / 2;
    }
    ctx.drawImage(bgImg, sx, sy, sw, sh, 0, 0, 1080, 1920);

    // Draw text/card overlay on top
    const overlayImg = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("オーバーレイ画像の読み込み失敗"));
      img.src = overlayDataUrl;
    });
    ctx.drawImage(overlayImg, 0, 0, 1080, 1920);

    return canvas.toDataURL("image/jpeg", 0.85);
  }, [data.themeId, bgBlobUrls]);

  const handleSendDiscord = useCallback(async () => {
    setSendingDiscord(true);
    try {
      const dataUrl = await generateImage();
      if (!dataUrl) return;

      const byteString = atob(dataUrl.split(",")[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
      const blob = new Blob([ab], { type: "image/jpeg" });

      const formData = new FormData();
      formData.append("image", blob, "story.jpg");
      formData.append("storeName", data.storeName);
      formData.append("date", data.date);

      const result = await fetch("/api/discord", {
        method: "POST",
        body: formData,
      });

      if (result.ok) {
        setToast({ message: "Discordに送信しました", type: "success" });
      } else {
        const json = await result.json();
        setToast({
          message: json.error || "送信に失敗しました",
          type: "error",
        });
      }
    } catch (err) {
      console.error("Discord送信エラー:", err);
      setToast({ message: "送信に失敗しました", type: "error" });
    } finally {
      setSendingDiscord(false);
    }
  }, [data.storeName, data.date, generateImage]);

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
                onClick={handleSendDiscord}
                disabled={sendingDiscord}
                className="w-full mt-8 bg-[#5865F2] hover:bg-[#4752C4] disabled:opacity-50 text-white font-medium py-3.5 px-6 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <svg
                  width="20"
                  height="15"
                  viewBox="0 0 71 55"
                  fill="currentColor"
                >
                  <path d="M60.1 4.9A58.5 58.5 0 0 0 45.4.2a.2.2 0 0 0-.2.1 40.8 40.8 0 0 0-1.8 3.7 54 54 0 0 0-16.2 0A37.4 37.4 0 0 0 25.4.3a.2.2 0 0 0-.2-.1A58.4 58.4 0 0 0 10.5 4.9a.2.2 0 0 0-.1.1C1.5 18.7-.9 32.2.3 45.5v.2a58.9 58.9 0 0 0 17.7 9a.2.2 0 0 0 .3-.1 42.1 42.1 0 0 0 3.6-5.9.2.2 0 0 0-.1-.3 38.8 38.8 0 0 1-5.5-2.7.2.2 0 0 1 0-.4l1.1-.9a.2.2 0 0 1 .2 0 42 42 0 0 0 35.6 0 .2.2 0 0 1 .2 0l1.1.9a.2.2 0 0 1 0 .4 36.4 36.4 0 0 1-5.5 2.7.2.2 0 0 0-.1.3 47.3 47.3 0 0 0 3.6 5.9.2.2 0 0 0 .3.1A58.7 58.7 0 0 0 70.4 45.7v-.2c1.4-15-2.3-28-9.8-39.6a.2.2 0 0 0-.1-.1ZM23.7 37.3c-3.4 0-6.3-3.1-6.3-7s2.8-7 6.3-7 6.3 3.2 6.3 7-2.8 7-6.3 7Zm23.2 0c-3.4 0-6.3-3.1-6.3-7s2.8-7 6.3-7 6.3 3.2 6.3 7-2.8 7-6.3 7Z" />
                </svg>
                {sendingDiscord ? "送信中..." : "Discordに送信"}
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
                <StoryPreview data={data} previewRef={previewRef} bgDataUrl={bgBlobUrls[data.themeId]} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg text-white font-medium transition-all z-50 ${
            toast.type === "success" ? "bg-[#5865F2]" : "bg-red-500"
          }`}
        >
          {toast.type === "success" ? "✅" : "❌"} {toast.message}
        </div>
      )}
    </main>
  );
}
