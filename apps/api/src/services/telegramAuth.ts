import crypto from "node:crypto";

export function verifyTelegramInitData(initData: string, botToken: string) {
  if (!botToken || !initData) return false;

  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  if (!hash) return false;
  params.delete("hash");

  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  const secretKey = crypto.createHmac("sha256", "WebAppData").update(botToken).digest();
  const calculated = crypto.createHmac("sha256", secretKey).update(dataCheckString).digest("hex");
  if (calculated.length !== hash.length) return false;

  return crypto.timingSafeEqual(Buffer.from(calculated), Buffer.from(hash));
}
