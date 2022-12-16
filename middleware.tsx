import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware (request: NextRequest) {
  const locales = ['es', 'en']
  const defaultLang = 'es'
  const { headers, nextUrl } = request

  // Exclude statics - add your static folders
  const shouldCheckLocale =
    !nextUrl.pathname.startsWith('/_next') &&
    !nextUrl.pathname.startsWith('/favicon')
  // && !nextUrl.pathname.startsWith("/images/");
  const reqLocale = nextUrl.pathname.split('/')[1]
  const noValidLocale = !locales.includes(reqLocale)
  const isNotSavedLang = request.cookies.get('lang')?.value === undefined

  if (shouldCheckLocale && noValidLocale && isNotSavedLang) {
    // TODO: check from cookie before detecting
    const accepts = headers.get('accept-language') || ''
    // Omit country for now
    const detected = accepts.split(',')[0].split('-')[0]

    const validLocale = locales.includes(detected) ? detected : defaultLang

    nextUrl.pathname = `${nextUrl.pathname}`
    const res = NextResponse.redirect(
      new URL(`/${validLocale}${nextUrl.pathname}`, request.url)
    )
    res.cookies.set('lang', validLocale ?? 'en')

    return res
  }

  if (!isNotSavedLang && shouldCheckLocale && noValidLocale) {
    return NextResponse.redirect(
      new URL(
        `/${request.cookies.get('lang')?.value}${nextUrl.pathname}`,
        request.url
      )
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*']
}
