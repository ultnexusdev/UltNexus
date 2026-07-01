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

    if (user !== 'durular' || pwd !== 'defne') {
      return new NextResponse('Bu site şu anda yapım aşamasındadır. Giriş yetkisi gereklidir.', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
      });
    }
  } else {
    return new NextResponse('Bu site şu anda yapım aşamasındadır. Giriş yetkisi gereklidir.', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  // --- JWT & PROFILE COMPLETION CHECK ---
  const token = req.cookies.get('token')?.value;

  if (token) {
    try {
      const payloadBase64 = token.split('.')[1];
      if (payloadBase64) {
        const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf-8');
        const payload = JSON.parse(payloadJson);
        
        const isProfileCompleted = payload.isProfileCompleted === true;
        
        if (!isProfileCompleted && 
            !req.nextUrl.pathname.startsWith('/set-username') &&
            !req.nextUrl.pathname.startsWith('/api') &&
            !req.nextUrl.pathname.startsWith('/_next')
        ) {
          return NextResponse.redirect(new URL('/set-username', req.url));
        }

        if (isProfileCompleted && req.nextUrl.pathname.startsWith('/set-username')) {
          return NextResponse.redirect(new URL('/', req.url));
        }
      }
    } catch (e) {
      // Ignored
    }
  }

  return NextResponse.next();
}

// Hangi sayfalarda şifre sorulacağını belirliyoruz. (Görseller ve altyapı dosyaları hariç her yer)
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
