import * as React from 'react'
import { Logo } from '../icons/logo'

export const LogoNavbar = ({ companyName }: {companyName: string}) => {
  return (
    <div className='flex title-font font-bold items-center'>
      <Logo
        width={48}
        colorClass='stroke-dark fill-primary dark:fill-light dark:stroke-primary'
      />
      <span className='font-bold text-3xl ml-1'>{companyName}</span>
    </div>
  )
}
