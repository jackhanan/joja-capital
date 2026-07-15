export const ADMIN_COOKIE_NAME = "joja_admin_session";

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function getExpectedSessionToken(
  adminPassword: string
): Promise<string> {
  return sha256Hex(`joja-capital-admin-session:${adminPassword}`);
}

export async function isValidSessionToken(
  token: string | undefined | null,
  adminPassword: string
): Promise<boolean> {
  if (!token || !adminPassword) return false;
  const expected = await getExpectedSessionToken(adminPassword);
  return token === expected;
}
