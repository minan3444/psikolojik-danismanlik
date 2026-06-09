import { NextResponse } from "next/server";

// export function middleware  →  export default function proxy
export default function proxy(request) {
  const url = request.nextUrl.clone();

  // Sadece /yonetim-paneli ve altındaki rotaları kontrol et
  if (url.pathname.startsWith("/yonetim-paneli")) {
    // Eğer istek login sayfasına yapılıyorsa geçişe izin ver
    if (url.pathname === "/yonetim-paneli/login") {
      return NextResponse.next();
    }

    const token = request.cookies.get("admin_token");

    // Çerez yoksa veya geçersizse login sayfasına yönlendir
    if (!token || token.value !== "authenticated") {
      url.pathname = "/yonetim-paneli/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/yonetim-paneli/:path*"],
};
