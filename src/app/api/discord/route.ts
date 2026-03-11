import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL?.trim();
  const roleId = process.env.DISCORD_ROLE_ID?.trim();

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "DISCORD_WEBHOOK_URL が設定されていません" },
      { status: 500 }
    );
  }

  try {
    const formData = await req.formData();
    const image = formData.get("image") as File | null;
    const storeName = formData.get("storeName") as string;
    const date = formData.get("date") as string;

    if (!image) {
      return NextResponse.json(
        { error: "画像が添付されていません" },
        { status: 400 }
      );
    }

    const mention = roleId ? `<@&${roleId}> ` : "";
    const message = `${mention}${storeName} ${date}のストーリー画像です！投稿お願いします🙏`;

    const discordForm = new FormData();
    discordForm.append(
      "payload_json",
      JSON.stringify({
        content: message,
        allowed_mentions: { roles: roleId ? [roleId] : [] },
      })
    );
    discordForm.append(
      "files[0]",
      new Blob([await image.arrayBuffer()], { type: "image/png" }),
      `salon-story-${date.replace(/\//g, "-") || "image"}.png`
    );

    const res = await fetch(webhookUrl, {
      method: "POST",
      body: discordForm,
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Discord API error:", res.status, text);
      return NextResponse.json(
        { error: "Discordへの送信に失敗しました" },
        { status: res.status }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Discord送信エラー:", err);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
