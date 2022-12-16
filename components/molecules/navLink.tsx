import * as React from 'react'
import Link from 'next/link'

export interface ILink {
  text: string
  url: string
}

export interface INavLink {
  linksArray: Array<ILink>
}

export const NavLink: React.FC<INavLink> = ({ linksArray }) => {
  return (
    <nav className='md:ml-auto flex flex-wrap items-center text-base justify-center'>
      {linksArray.map((el, index) => (
        <Link href={el.url} passHref key={index} className='mr-5 hover:text-gray-600 dark:hover:text-gray-400'>
          {el.text}
        </Link>
      ))}
    </nav>
  )
}
