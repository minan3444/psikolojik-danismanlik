"use server";

import { cookies } from "next/headers";

export async function loginAction(data) {
  const { username, password } = data;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // Giriş başarılı, çerez oluştur (1 günlük)
    const cookieStore = await cookies();
    cookieStore.set("admin_token", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 gün
      path: "/",
    });
    return { success: true };
  }

  return { success: false, error: "Kullanıcı adı veya şifre hatalı!" };
}

export async function logoutAction() {
  // Çerezi sil
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  return { success: true };
}
