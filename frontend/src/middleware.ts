import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Eğer geliştirme ortamındaysak (kendi bilgisayarımızda) şifre sormasın
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    // Kullanıcı adı: admin, Şifre: ultnexus
    // Bunları istersen sonradan değiştirebiliriz.
    const [user, pwd] = atob(authValue).split(':');

    if (user === 'durular' && pwd === 'defne') {
      return NextResponse.next();
    }
  }

  // Şifre yanlışsa veya hiç girilmemişse giriş ekranı (pop-up) göster
  return new NextResponse('Bu site şu anda yapım aşamasındadır. Giriş yetkisi gereklidir.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

// Hangi sayfalarda şifre sorulacağını belirliyoruz. (Görseller ve altyapı dosyaları hariç her yer)
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
