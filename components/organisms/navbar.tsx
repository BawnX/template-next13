'use client'

import Link from 'next/link'
import { LogoNavbar } from '@components/atoms/logoNavbar'
import { Button } from '@components/atoms/button'
import { ILink, NavLink } from '@components/molecules/navLink'
import { Sun } from '@components/icons/sun'
import { Moon } from '@components/icons/moon'
import { useLanguageContext } from '@components/atoms/languageContext'
import { useThemeContext } from '@components/atoms/themeContext'

export const NavBar = () => {
  const { handleLang, lang, text } = useLanguageContext()
  const { mode, handleTheme } = useThemeContext()

  const linksArray: Array<ILink> = [
    {
      text: text.navigation.pricing,
      url: `/${lang}/pricing`
    }
  ]

  return (
    <div className='mx-auto flex flex-wrap py-2.5 px-8 flex-col md:flex-row items-center font-medium'>
      <Link href={`/${lang}`} passHref>
        <LogoNavbar companyName={text.navigation.logo} />
      </Link>
      <NavLink linksArray={linksArray} />
      <Button
        onClick={() => handleTheme()}
        color='transparent'
        isRounded
        size='normal'
      >
        {
          mode === 'light'
            ? (
              <Sun className='hover:text-gray-600' />
              )
            : (
              <Moon className='hover:text-gray-400' />
              )
        }
      </Button>
      <Button
        color='primary'
        isRounded
        onClick={() => console.log('redirect')}
        size='normal'
      >
        {text.navigation.system}
      </Button>
      <Button
        color='transparent'
        isRounded
        size='normal'
        onClick={() => handleLang('es')}
      >
        ES
      </Button>
      |
      <Button
        color='transparent'
        isRounded
        size='normal'
        onClick={() => handleLang('en')}
      >
        EN
      </Button>
    </div>
  )
}
